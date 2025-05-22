import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
} from '@mui/material';
import {
  People as PeopleIcon,
  Person as PersonIcon,
  ImportExport as ImportExportIcon,
} from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [clientCount, setClientCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [entryExitCount, setEntryExitCount] = useState(0);
  const [sortyExitCount, setSortyExitCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = {
    clients: 150,
    users: 75,
    entryExit: 200,
    sortyExitCount: 12,
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        setClientCount(data.clients);
        setUserCount(data.users);
        setEntryExitCount(data.entryExit);
        setSortyExitCount(data.sortyExitCount);
        setLoading(false);
      } catch {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    }, 1000);
  }, []);

  const colors = {
    primary: '#1E3A8A',
    secondary: '#3B82F6',
    accent1: '#10B981',
    accent2: '#8B5CF6',
    background: '#F9FAFB',
    cardBackground: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
  };

  const chartData = {
    labels: ['Clients', 'Users', 'Entries', 'Exits'],
    datasets: [
      {
        label: 'Metrics',
        data: [clientCount, userCount, entryExitCount, sortyExitCount],
        backgroundColor: [colors.accent1, colors.secondary, colors.primary, colors.accent2],
        borderColor: [colors.accent1, colors.secondary, colors.primary, colors.accent2],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: colors.textPrimary } },
      title: {
        display: true,
        text: 'Metrics Overview',
        color: colors.textPrimary,
        font: { size: 16, weight: 'bold' },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: colors.textPrimary },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      y: {
        ticks: { color: colors.textPrimary },
        grid: { display: false },
      },
    },
  };

  const cardStyle = {
    backgroundColor: colors.cardBackground,
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <CircularProgress sx={{ color: colors.primary }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-600">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          padding: '1rem 0',
          marginBottom: '1rem',
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>
          Enterprise Dashboard
        </Typography>
      </header>

      <Container maxWidth="lg">
        {/* Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardStyle}>
              <CardContent className="flex flex-col items-center">
                <PeopleIcon sx={{ fontSize: 40, color: colors.accent1, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: colors.textSecondary }}>
                  Clients
                </Typography>
                <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 'bold' }}>
                  {clientCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardStyle}>
              <CardContent className="flex flex-col items-center">
                <PersonIcon sx={{ fontSize: 40, color: colors.secondary, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: colors.textSecondary }}>
                  Users
                </Typography>
                <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 'bold' }}>
                  {userCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardStyle}>
              <CardContent className="flex flex-col items-center">
                <ImportExportIcon sx={{ fontSize: 40, color: colors.primary, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: colors.textSecondary }}>
                  Entries
                </Typography>
                <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 'bold' }}>
                  {entryExitCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardStyle}>
              <CardContent className="flex flex-col items-center">
                <ImportExportIcon sx={{ fontSize: 40, color: colors.accent2, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ color: colors.textSecondary }}>
                  Exits
                </Typography>
                <Typography variant="h5" sx={{ color: colors.textPrimary, fontWeight: 'bold' }}>
                  {sortyExitCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Chart */}
        <Card
          sx={{
            height: 400,
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            backgroundColor: colors.cardBackground,
          }}
        >
          <CardContent sx={{ height: '100%' }}>
            <Bar data={chartData} options={chartOptions} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Dashboard;
