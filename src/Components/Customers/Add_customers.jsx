import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function AddCustomers({ open, handleClose, onSuccess }) {
  const [formData, setFormData] = useState({
    cin_client: "",
    photo_client: "",
    nom_client: "",
    prenom_client: "",
    email_client: "",
    adresse_client: "",
    telephone_client: "",
    paf_client: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo_client: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newClient = await response.json();
      onSuccess(newClient);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter un client</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="cin_client"
          label="CIN"
          fullWidth
          value={formData.cin_client}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: "16px 0" }}
        />
        <TextField
          margin="dense"
          name="nom_client"
          label="Nom"
          fullWidth
          value={formData.nom_client}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="prenom_client"
          label="Prénom"
          fullWidth
          value={formData.prenom_client}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email_client"
          label="Email"
          fullWidth
          value={formData.email_client}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="adresse_client"
          label="Adresse"
          fullWidth
          value={formData.adresse_client}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="telephone_client"
          label="Téléphone"
          fullWidth
          value={formData.telephone_client}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="paf_client"
          label="PAF"
          type="number"
          fullWidth
          value={formData.paf_client}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCustomers;