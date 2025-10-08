import React from 'react';
import { Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data }) => {
  return (
    <>
      <Typography variant="h6" color="white" mb={2}>
        Sales by User
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
          <Bar dataKey="total" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SalesChart;
