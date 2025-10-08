import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDashboardData = async () => {
  const { data } = await axios.get('https://dummyjson.com/carts'); 
  const carts = data.carts;

  const topSalesUsers = carts.sort((a, b) => b.total - a.total)
  const salesByUser = topSalesUsers.map(user => ({
    name: `User ${user.userId}`,
    total: user.total,
  }));

  const productPerformance = carts.flatMap(cart =>
    cart.products.map(p => ({
      product: p.title,
      quantity: p.quantity,
      revenue: p.price * p.quantity,
    }))
  );

  const productDistribution = Object.values(
    productPerformance.reduce((acc, p) => {
      if (!acc[p.product]) {
        acc[p.product] = { name: p.product, quantity: 0 };
      }
      acc[p.product].quantity += p.quantity;
      return acc;
    }, {})
  );

  const avgProductsPerCart = carts.reduce((sum, c) => sum + c.products.length, 0) / carts.length;

  const revenueOverCarts = carts.map(cart => ({
    name: `Cart ${cart.id}`,
    total: cart.total,
  }));

  return { salesByUser, productPerformance, productDistribution, avgProductsPerCart, revenueOverCarts };
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });
};
