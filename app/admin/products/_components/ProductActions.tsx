"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products";

interface ToggleProps {
  id: string;
  isAvailableForPurchase: boolean;
}

interface DeleteProps {
  id: string;
  fileId: string;
  imageId: string;
}

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: ToggleProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      asChild
      className="cursor-pointer text-xs"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
        });
      }}
    >
      <span>{isAvailableForPurchase ? "Deactive" : "Active"}</span>
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({ id, fileId, imageId }: DeleteProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer text-xs text-red-500 hover:text-red-600"
        onClick={() => {
          startTransition(async () => {
            await deleteProduct(id, fileId, imageId);
          });
        }}
      >
        Delete
      </DropdownMenuItem>
    </>
  );
}
