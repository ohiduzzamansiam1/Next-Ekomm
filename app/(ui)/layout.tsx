import React from "react";
import { Navbar, NavLink } from "../_components/Navbar";

export default function UserFacingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Navbar>

      <div className="container my-6">{children}</div>
    </>
  );
}
