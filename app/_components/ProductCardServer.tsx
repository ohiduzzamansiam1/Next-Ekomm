import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Product } from "@prisma/client";
import ProductCardClient from "./ProductCardClient";

export default async function ProductCardServer({
  product,
}: {
  product: Product;
}) {
  const { userId } = auth();

  const isPurchased = !!(await db.order.findFirst({
    where: {
      productId: product.id,
      userId: userId ?? "",
    },
  }));

  return <ProductCardClient {...product} isPurchased={isPurchased} />;
}
