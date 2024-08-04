import { Button } from "@/components/ui/button";

import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ProductCardServer from "../_components/ProductCardServer";
import { ProductCardSkeleton } from "../_components/ProjectCardSkeleton";

async function getPopularProducts() {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      order: {
        _count: "desc",
      },
    },
    take: 6,
  });
}
async function getNewestProducts() {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
}

export default function HomePage() {
  return (
    <main className="space-y-12 pb-6">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        }
      >
        <ProductGridSection
          title="Most Popular"
          fetchProducts={getPopularProducts}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        }
      >
        <ProductGridSection
          title="New Arrivals"
          fetchProducts={getNewestProducts}
        />
      </Suspense>
    </main>
  );
}

async function ProductGridSection({
  title,
  fetchProducts,
}: {
  title: string;
  fetchProducts: () => Promise<Product[]>;
}) {
  const products = await fetchProducts();
  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild variant="outline" size="sm">
          <Link href={`/products`} className="gap-1">
            <span className="text-xs">View All</span>
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:gris-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCardServer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
