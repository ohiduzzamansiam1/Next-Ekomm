import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";

export default async function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) redirect("/admin/products");

  return (
    <div>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}
