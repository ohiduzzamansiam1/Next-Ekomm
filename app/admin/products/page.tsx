import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { CheckCircle, EllipsisVerticalIcon, Plus, XCircle } from "lucide-react";
import Link from "next/link";
import PageHeader from "../_components/PageHeader";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductActions";

export default async function AdminProductPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader>Products</PageHeader>

        <Button asChild>
          <Link href="/admin/products/new" className="gap-1">
            <Plus className="size-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <ProductsTable />
    </div>
  );
}

async function ProductsTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      description: true,
      filePath: true,
      fileId: true,
      imageId: true,
      isAvailableForPurchase: true,
      _count: {
        select: {
          order: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  if (products.length === 0) {
    return <div>No products found</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available For Purchase</span>
                  <Tooltip>
                    <TooltipTrigger className="flex">
                      <CheckCircle className="size-4 text-green-500" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Available</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <>
                  <span className="sr-only">Not Available For Purchase</span>
                  <Tooltip>
                    <TooltipTrigger className="flex">
                      <XCircle className="size-4 text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Unavailable</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </TableCell>

            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{formatNumber(product._count.order)}</TableCell>
            <TableCell className="w-0">
              <span className="sr-only">Actions</span>
            </TableCell>
            <TableCell className="w-0">
              <span className="sr-only">Actions</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVerticalIcon className="size-4 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a
                      className="w-full cursor-pointer text-xs"
                      download
                      href={`/admin/products/${product.id}/download`}
                    >
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      className="w-full cursor-pointer text-xs"
                      download
                      href={`/admin/products/${product.id}/edit`}
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  />

                  <DropdownMenuSeparator />

                  <DeleteDropdownItem
                    id={product.id}
                    fileId={product.fileId}
                    imageId={product.imageId}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
