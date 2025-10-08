import React, { useState, useEffect } from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import SalesChart from './SalesChart';
import ProductPerformance from './ProductPerformance';
import ProductDistributionDonut from './ProductDistribution';
import { Box, CircularProgress, Alert, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const charts = [
  { id: 'sales', component: SalesChart },
  { id: 'performance', component: ProductPerformance },
  { id: 'distribution', component: ProductDistributionDonut },
];

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardData();
  const [activeChart, setActiveChart] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChart(prev => (prev + 1) % charts.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

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

    <Box display='flex' justifyContent={'center'} sx={{ mb: 4, mt: 18, height: 300, position: 'relative' }}>
        <AnimatePresence>
          {charts.map((chart, index) => {
            if (index !== activeChart) return null;
            const ChartComponent = chart.component;
            return (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 2 }}
                style={{ position: 'absolute', width: '80%' }}
              >
                <Paper sx={{ p: 3, bgcolor: '#1E1E1E', borderRadius: 3 }}>
                  <ChartComponent
                    data={
                      chart.id === 'sales'
                        ? data.salesByUser
                        : chart.id === 'performance'
                        ? data.productPerformance
                        : data.productDistribution
                    }
                  />
                </Paper>
              </motion.div>
            );
          })}
        </AnimatePresence>
    </Box>
  );
};

export default Dashboard;
