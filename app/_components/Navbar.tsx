"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary text-primary-foreground flex items-center px-4 justify-between">
      <div></div>
      <div className="h-16 flex items-center justify-center">{children}</div>
      <div>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "size-10",
            },
          }}
        />
      </div>
    </div>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground text-sm",
        pathname === props.href && "bg-background text-foreground"
      )}
      {...props}
    />
  );
}
