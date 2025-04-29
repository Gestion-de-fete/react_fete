import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningIcon from "@mui/icons-material/Warning";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [capsLockActive, setCapsLockActive] = useState(false);
  const navigate = useNavigate(); // Hook useNavigate pour la redirection

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    if (!password) {
      setPasswordError("");
    } else if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins un chiffre, une lettre minuscule, une lettre majuscule et une ponctuation"
      );
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      setCapsLockActive(e.getModifierState("CapsLock"));
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email_utilisateur: email,
      mot_de_passe_utilisateur: password,
    };

    try {
      // Envoi des données de connexion au backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Connexion réussie !");
        // Redirection vers la page d'accueil ou tableau de bord après connexion réussie
        navigate("/dashboard"); // Remplace "/dashboard" par la route de ton choix
      } else {
        alert(data.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          style={{
            padding: 20,
            display: "flex",
            marginTop: "5%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Connexion
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1, width: "100%" }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              helperText={passwordError}
              error={!!passwordError}
              InputProps={{
                endAdornment: passwordError && (
                  <ErrorOutlineIcon
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    color="error"
                  />
                ),
              }}
            />
            {capsLockActive && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <WarningIcon color="warning" sx={{ marginRight: 1 }} />
                <Typography variant="body2" color="warning">
                  Le verrouillage des majuscules est activé
                </Typography>
              </Box>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleShowPassword}
                  color="primary"
                />
              }
              label="Afficher le mot de passe"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Se connecter
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Pas encore inscrit ?{" "}
              <Button
                onClick={() => navigate("/register")} // Redirection vers la page d'inscription
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Créer un compte
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
