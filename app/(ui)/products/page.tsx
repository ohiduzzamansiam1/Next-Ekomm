import ProductCardServer from "@/app/_components/ProductCardServer";
import { ProductCardSkeleton } from "@/app/_components/ProjectCardSkeleton";
import { db } from "@/lib/db";
import { Suspense } from "react";

async function getProducts() {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">All Products</h2>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        }
      >
        <ProductGridSection />
      </Suspense>
    </div>
  );
}

async function ProductGridSection() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-6">
      {products.map((product) => (
        <ProductCardServer key={product.id} product={product} />
      ))}
    </div>
  );
}
