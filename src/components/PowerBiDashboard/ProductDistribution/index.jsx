import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B10DC9', '#FF4136'];

const ProductDistributionDonut = ({ data }) => {

const topProducts = data.sort((a, b) => b.quantity 
* a.quantity).slice(0, 6);


  return (
    <>
    <Typography variant="h6" color="white" mb={2}>
        Top Product Distribuiton
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={topProducts}
          dataKey="quantity"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          label={({ name, percent }) =>
            ` ${name.substring(0, 12)} (${(percent * 100).toFixed(0)}%) `
          }
        >
          {topProducts.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer></>
  );
};

export default ProductDistributionDonut;
