import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Entree_Sortie() {
  const [entreesSorties, setEntreesSorties] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCin, setFilterCin] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/entree_sortie/fetch")
      .then((response) => {
        setEntreesSorties(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération :", error);
      });
  }, []);

  // Filtrage dynamique selon la saisie dans le champ CIN
  useEffect(() => {
    if (!filterCin) {
      setFilteredData(entreesSorties);
    } else {
      const filtered = entreesSorties.filter((item) =>
        item.cin_client.toLowerCase().includes(filterCin.toLowerCase())
      );
      setFilteredData(filtered);
      setPage(0); // reset pagination
    }
  }, [filterCin, entreesSorties]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Liste des Entrées / Sorties
      </Typography>
      <Paper sx={{ p: 2, mb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            value={filterCin}
            onChange={(e) => setFilterCin(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Box>
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#fff" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>CIN</TableCell>
                <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Nom</TableCell>
                <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Prénom</TableCell>
                <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>État</TableCell>
                <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Date & Heure</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={item.id_entree_sortie} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{item.cin_client}</TableCell>
                    <TableCell>{item.nom}</TableCell>
                    <TableCell>{item.prenom}</TableCell>
                    <TableCell>{item.etat}</TableCell>
                    <TableCell>{item.date_heure}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Entree_Sortie;
