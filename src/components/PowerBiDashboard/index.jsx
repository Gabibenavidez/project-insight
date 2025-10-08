import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import SalesChart from './SalesChart';
import ProductPerformance from './ProductPerformance';
import ProductDistributionDonut from './ProductDistribution';
import { Box, Grid, Typography, CircularProgress, Alert, Paper } from '@mui/material';

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Alert severity="error">Error loading dashboard data.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#121212', minHeight: '100vh', overflowX: 'hidden' }}>
      <Typography variant="h4" color="white" fontWeight={700} mb={4}>
        📊 E-commerce Dashboard
      </Typography>

      <Grid container spacing={3} flexDirection={'column'}>
        <Grid>
          <Paper sx={{ p: 3, bgcolor: '#1E1E1E', borderRadius: 3 }}>
            <SalesChart data={data.salesByUser} />
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 3, bgcolor: '#1E1E1E', borderRadius: 3 }}>
            <ProductPerformance data={data.productPerformance} />
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 3, bgcolor: '#1E1E1E', borderRadius: 3 }}>
            <ProductDistributionDonut data={data.productDistribution} />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;
