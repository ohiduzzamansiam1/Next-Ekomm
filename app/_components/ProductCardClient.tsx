"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product as PrismaProduct } from "@prisma/client";
import Image from "next/image";
import { checkOut } from "../admin/_actions/products";

type Product = PrismaProduct & {
  isPurchased: boolean;
};

export default function ProductCardClient({
  id,
  name,
  priceInCents,
  description,
  imageUrl,
  isPurchased,
}: Product) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative h-auto aspect-video w-full p-5 bg-muted">
        <Image src={imageUrl} fill alt={name} className="shadow" />
      </div>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 -my-2">
        <p className="line-clamp-4 text-sm text-secondary-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        {isPurchased ? (
          <Button size="lg" className="w-full" variant="outline">
            View Product
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full"
            onClick={async () => {
              await checkOut({ product: { id, priceInCents, name, imageUrl } });
            }}
          >
            Purchase
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
