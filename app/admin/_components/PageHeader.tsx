export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="text-3xl mb-4 text-secondary-foreground">{children}</h1>
  );
}
