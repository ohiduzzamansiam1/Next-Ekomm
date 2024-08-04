import Link from "next/link";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="font-bold">Ekomm</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Electronics
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Clothing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Beauty
            </Link>
          </nav>
          <Link
            href="/sign-in"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Sign In
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="container space-y-6 px-4 text-center md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover the Best Products
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
            Shop our curated collection of high-quality products across various
            categories.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Shop Now
          </Link>
        </div>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              News
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Products</h3>
            <Link href="#" prefetch={false}>
              Electronics
            </Link>
            <Link href="#" prefetch={false}>
              Clothing
            </Link>
            <Link href="#" prefetch={false}>
              Home
            </Link>
            <Link href="#" prefetch={false}>
              Beauty
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Community
            </Link>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              FAQs
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          <div className="gap-1 hidden md:grid">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Sales
            </Link>
            <Link href="#" prefetch={false}>
              Press
            </Link>
            <Link href="#" prefetch={false}>
              Partnerships
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
