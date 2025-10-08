import React from 'react';
import { Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ProductPerformance = ({ data }) => {
  return (
    <>
      <Typography variant="h6" color="white" mb={2}>
        Product Performance
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="product" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
          <Line type="monotone" dataKey="revenue" stroke="#66bb6a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ProductPerformance;
