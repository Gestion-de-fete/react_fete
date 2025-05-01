import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Container,
  TablePagination,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Add_customers from "./Add_customers";
import Update_customers from "./Update_customers";

function Customers() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);
  const [openAdd, setOpenAdd] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch clients from the backend
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/clients");
        const data = await response.json();
        setClients(data);
        setFilteredClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
      setLoading(false);
    };
    fetchClients();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.nom_client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.prenom_client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email_client.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(filtered);
    setPage(0);
  }, [searchQuery, clients]);

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Dialog handlers
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenModify = (client) => {
    setSelectedClient(client);
    setOpenModify(true);
  };
  const handleCloseModify = () => {
    setOpenModify(false);
    setSelectedClient(null);
  };

  // Handle delete
  const handleDelete = async (cin_client) => {
    try {
      await fetch(`/api/clients/${cin_client}`, { method: "DELETE" });
      setClients(clients.filter((client) => client.cin_client !== cin_client));
      setFilteredClients(
        filteredClients.filter((client) => client.cin_client !== cin_client)
      );
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // Handle success (after add or update)
  const handleSuccess = (newClient) => {
    setClients((prev) => {
      const updatedClients = prev.filter(
        (client) => client.cin_client !== newClient.cin_client
      );
      return [...updatedClients, newClient];
    });
    setFilteredClients((prev) => {
      const updatedFiltered = prev.filter(
        (client) => client.cin_client !== newClient.cin_client
      );
      return [...updatedFiltered, newClient];
    });
    handleCloseAdd();
    handleCloseModify();
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Liste des clients
        </Typography>
      </Box>
      <Paper sx={{ p: 1, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAdd}
            sx={{ textTransform: "none" }}
          >
            <AddIcon /> Ajouter
          </Button>
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "300px" }}
          />
        </Box>
      </Paper>

      {/* Add Client Dialog */}
      <Add_customers
        open={openAdd}
        handleClose={handleCloseAdd}
        onSuccess={handleSuccess}
      />

      {/* Update Client Dialog */}
      <Update_customers
        open={openModify}
        handleClose={handleCloseModify}
        selectedClient={selectedClient}
        onSuccess={handleSuccess}
      />

      <TableContainer
        component={Paper}
        className="shadow-lg mt-1"
        sx={{ maxHeight: "700px", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>CIN</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>PAF</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredClients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => (
                  <TableRow key={client.cin_client}>
                    <TableCell>{client.cin_client}</TableCell>
                    <TableCell>
                      {client.photo_client ? (
                        <img
                          src={`data:image/jpeg;base64,${client.photo_client}`}
                          alt="Client"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell>{client.nom_client}</TableCell>
                    <TableCell>{client.prenom_client}</TableCell>
                    <TableCell>{client.email_client}</TableCell>
                    <TableCell>{client.adresse_client}</TableCell>
                    <TableCell>{client.telephone_client}</TableCell>
                    <TableCell>{client.paf_client}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenModify(client)}>
                        <Edit />
                      </Button>
                      <Button onClick={() => handleDelete(client.cin_client)}>
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[4, 10, 25]}
        component="div"
        count={filteredClients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Container>
  );
}

export default Customers;