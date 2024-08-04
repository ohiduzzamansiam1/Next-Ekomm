"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createProduct, updateProduct } from "../../_actions/products";

export default function ProductForm({ product }: { product?: Product }) {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents || undefined
  );

  return (
    <form
      className="space-y-3"
      action={product ? updateProduct : createProduct}
    >
      {product && <input type="hidden" name="id" value={product.id} />}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-xs">
          Product Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="priceInCents" className="text-xs">
          Product Price (cents)
        </Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <p className="text-muted-foreground mt-2 text-xs">
          {priceInCents ? formatCurrency(priceInCents / 100) : "$0"} in USD
        </p>
      </div>

      <div className="space-y-1">
        <Label htmlFor="description" className="text-xs">
          Product Description
        </Label>
        <Textarea
          id="description"
          name="description"
          required
          className="resize-none"
          defaultValue={product?.description}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="file" className="text-xs">
          Product File
        </Label>
        <Input type="file" id="file" name="file" required={!product} />
        {product && (
          <p className="text-muted-foreground mt-2 text-xs">
            {product.filePath}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="image" className="text-xs">
          Product Image
        </Label>
        <Input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required={!product}
        />
        {product && (
          <div className="w-24 aspect-video overflow-hidden rounded relative mx-auto">
            <Image src={`${product.imageUrl}`} alt="Product Image" fill />
          </div>
        )}
      </div>

      <SubmitButton editProduct={!!product} />
    </form>
  );
}

function SubmitButton({ editProduct }: { editProduct: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader className="animate-spin size-4" />
      ) : (
        `Save ${editProduct ? "Changes" : "Product"}`
      )}
    </Button>
  );
}
