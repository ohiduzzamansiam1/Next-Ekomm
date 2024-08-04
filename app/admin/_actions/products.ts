"use server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { utapi } from "@/lib/uploadthing";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(1).trim(),
  priceInCents: z.coerce.number().min(1),
  description: z.string().min(1).max(10000).trim(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10485760, "File size must be less than 10MB")
    .refine((file) => file.size > 0, "File size must be greater than 0"),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 10485760, "File size must be less than 10MB")
    .refine((file) => file.type.includes("image/"))
    .refine((file) => file.size > 0, "File size must be greater than 0"),
});

const formEditSchema = formSchema.extend({
  id: z.string(),
  file: z.instanceof(File).optional(),
  image: z.instanceof(File).optional(),
});

// Create a new product
export async function createProduct(form: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(form.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const [uploadedFile, uploadedImage] = await Promise.all([
    utapi.uploadFiles(data.file),
    utapi.uploadFiles(data.image),
  ]);

  await db.product.create({
    data: {
      name: data.name,
      priceInCents: data.priceInCents,
      description: data.description,
      fileId: uploadedFile.data?.key ?? "",
      filePath: uploadedFile?.data?.url ?? "",
      imageId: uploadedImage.data?.key ?? "",
      imageUrl: uploadedImage.data?.url ?? "",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

// Update an existing product
export async function updateProduct(form: FormData) {
  const result = formEditSchema.safeParse(Object.fromEntries(form.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const product = await db.product.findUnique({
    where: { id: data.id },
  });

  if (!product) return notFound();

  let { fileId, filePath, imageId, imageUrl } = product;

  const fileOperations = async () => {
    if (data.file && data.file.size > 0) {
      await utapi.deleteFiles(fileId);
      const uploadedFile = await utapi.uploadFiles(data.file);
      fileId = uploadedFile.data?.key ?? "";
      filePath = uploadedFile.data?.url ?? "";
    }
  };

  const imageOperations = async () => {
    if (data.image && data.image.size > 0) {
      await utapi.deleteFiles(imageId);
      const uploadedImage = await utapi.uploadFiles(data.image);
      imageId = uploadedImage.data?.key ?? "";
      imageUrl = uploadedImage.data?.url ?? "";
    }
  };

  await Promise.all([fileOperations(), imageOperations()]);

  await db.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      priceInCents: data.priceInCents,
      description: data.description,
      fileId,
      filePath,
      imageId,
      imageUrl,
    },
  });

  revalidatePath("/", "layout");
}

// Toggle product availability
export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/", "layout");
}

// Delete a product
export async function deleteProduct(
  id: string,
  fileId: string,
  imageId: string
) {
  await db.product.delete({
    where: { id },
  });

  await Promise.all([utapi.deleteFiles(fileId), utapi.deleteFiles(imageId)]);

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function checkOut({
  product,
}: {
  product: { id: string; priceInCents: number; name: string; imageUrl: string };
}) {
  const user = await currentUser();

  if (!user?.id) return redirect("/sign-in");

  const userOrderExists = await db.order.findFirst({
    where: {
      userId: user.id,
      productId: product.id,
    },
  });

  if (userOrderExists) return redirect("/products");

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          unit_amount: product.priceInCents,
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.URL_ORIGIN}/products`,
    cancel_url: `${process.env.URL_ORIGIN}/products`,
    metadata: {
      userId: user.id,
      productId: product.id,
    },
  });

  return redirect(session.url as string);
}
