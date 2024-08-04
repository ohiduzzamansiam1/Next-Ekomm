import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/utils";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: {
      pricePaidInCents: true,
    },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getCustomersData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _count: true,
    }),
  ]);

  return {
    numberOfCustomers: userCount,
    averageValue: !userCount ? 0 : (orderData._count * 100) / userCount,
  };
}

async function getProductsData() {
  const [activeProducts, inactiveProducts] = await Promise.all([
    db.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    db.product.count({
      where: {
        isAvailableForPurchase: false,
      },
    }),
  ]);

  return {
    activeProducts,
    inactiveProducts,
  };
}

export default async function AdminPage() {
  const [salesData, customersData, productsData] = await Promise.all([
    getSalesData(),
    getCustomersData(),
    getProductsData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:gris-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        description={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        description={`${formatCurrency(
          customersData.averageValue
        )} Average Value`}
        body={formatNumber(customersData.numberOfCustomers)}
      />
      <DashboardCard
        title="Active Products"
        description={`${formatNumber(
          productsData.inactiveProducts
        )} Inactive Products`}
        body={formatNumber(productsData.activeProducts)}
      />
    </div>
  );
}

interface CardProps {
  title: string;
  description: string;
  body: string;
}

function DashboardCard({ title, description, body }: CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold">{body}</h2>
      </CardContent>
    </Card>
  );
}
