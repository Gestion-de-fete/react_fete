import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { People as PeopleIcon, Person as PersonIcon, ImportExport as ImportExportIcon } from '@mui/icons-material';

function Dashboard() {
  // Données JSON simulées directement dans le fichier
  const data = {
    clients: 150,
    users: 75,
    entryExit: 200,
    sortyExitCount: 12
  };

  const [clientCount, setClientCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [entryExitCount, setEntryExitCount] = useState(0);
  const [sortyExitCount, setSortyExitCount] = useState(0);

  // Utiliser les données directement
  useEffect(() => {
    setClientCount(data.clients);  // Récupérer le nombre de clients
    setUserCount(data.users);      // Récupérer le nombre d'utilisateurs
    setEntryExitCount(data.entryExit); // Récupérer le nombre d'entrées/sorties
    setSortyExitCount(data.sortyExitCount);
  }, [data.clients, data.entryExit, data.sortyExitCount, data.users]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Dashboard</h1>
      <Grid container spacing={4}>
        {/* Card for Clients */}
        <Grid item xs={12} sm={4}>
          <Card className="bg-sky-600 text-white">
            <CardContent className="flex flex-col items-center">
              <PeopleIcon className="text-4xl mb-3" />
              <Typography variant="h6">Clients</Typography>
              <Typography variant="h5">{clientCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Users */}
        <Grid item xs={12} sm={4}>
          <Card className="bg-blue-500 text-white">
            <CardContent className="flex flex-col items-center">
              <PersonIcon className="text-4xl mb-3" />
              <Typography variant="h6">Utilisateurs</Typography>
              <Typography variant="h5">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Entry/Exit */}
        <Grid item xs={12} sm={4}>
          <Card className="bg-indigo-600 text-white">
            <CardContent className="flex flex-col items-center">
              <ImportExportIcon className="text-4xl mb-3" />
              <Typography variant="h6">Entrée</Typography>
              <Typography variant="h5">{entryExitCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="bg-indigo-600 text-white">
            <CardContent className="flex flex-col items-center">
              <ImportExportIcon className="text-4xl mb-3" />
              <Typography variant="h6">Sortie</Typography>
              <Typography variant="h5">{sortyExitCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
