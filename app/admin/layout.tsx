import { Navbar, NavLink } from "@/app/_components/Navbar";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!checkRole("admin")) redirect("/");

  return (
    <div>
      <Navbar>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Orders</NavLink>
      </Navbar>
      <div className="container my-6">{children}</div>
    </div>
  );
}
