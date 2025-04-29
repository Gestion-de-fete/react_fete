import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as CustomersIcon,
  Person as UserIcon,
  ImportExport as EntreeSortieIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";

const drawerWidthOpen = 240;
const drawerWidthClosed = 64;

// Composant animé pour la sidebar
const MotionDrawer = styled(motion.div)(() => ({
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1300,
  background: "linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%)",
  color: "white",
  overflowX: "hidden",
  boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateX(4px)",
    transition: "all 0.2s ease",
  },
}));

const NavItem = ({ item, isOpen }) => (
  <ListItem disablePadding sx={{ display: "block" }}>
    <Tooltip title={!isOpen ? item.title : ""} placement="right">
      <StyledListItemButton component={Link} to={item.path}>
        <ListItemIcon
          sx={{
            color: "white",
            minWidth: 0,
            mr: isOpen ? 2 : "auto",
            justifyContent: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {isOpen && <ListItemText primary={item.title} />}
      </StyledListItemButton>
    </Tooltip>
  </ListItem>
);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState(null); // Variable pour le rôle de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    // Charger le rôle de l'utilisateur depuis le localStorage ou autre méthode d'authentification
    const role = localStorage.getItem("role_utilisateur"); // On suppose que le rôle est stocké dans le localStorage
    setUserRole(role);
  }, []);

  const navItems = [
    { title: "Tableau de bord", icon: <DashboardIcon fontSize="small" />, path: "/dashboard" },
    { title: "Clients", icon: <CustomersIcon fontSize="small" />, path: "/customers" },
    { title: "Utilisateur", icon: <UserIcon fontSize="small" />, path: "/user", role: "admin" }, // L'élément Utilisateur est destiné aux admins
    { title: "Entrée/Sortie", icon: <EntreeSortieIcon fontSize="small" />, path: "/entree_sortie" },
  ];

  const handleLogout = () => {
    // Afficher la confirmation de déconnexion avec SweetAlert2
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous allez vous déconnecter de votre compte.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Annuler",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Suppression des éléments du localStorage
        localStorage.removeItem("utilisateur_id");
        localStorage.removeItem("role_utilisateur");
        localStorage.removeItem("email_utilisateur");

        // Redirection vers la page de connexion
        navigate("/login");

        // Afficher une alerte de confirmation
        Swal.fire("Déconnecté!", "Vous avez été déconnecté.", "success");
      }
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar animé */}
      <MotionDrawer
        animate={{ width: isOpen ? drawerWidthOpen : drawerWidthClosed }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isOpen ? "space-between" : "center",
            px: 2,
            py: 2.5,
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {isOpen && (
            <Typography variant="h6" fontWeight="bold">
              Dashboard
            </Typography>
          )}
          <IconButton onClick={() => setIsOpen(!isOpen)} sx={{ color: "white" }}>
            <MenuIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Navigation */}
        <List sx={{ flex: 1, pt: 1 }}>
          {navItems.map(
            (item, index) =>
              (!item.role || item.role === userRole) && ( // Vérification du rôle avant d'afficher l'élément
                <NavItem key={index} item={item} isOpen={isOpen} />
              )
          )}
        </List>

        {/* Footer */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            px: 2,
            py: 2,
          }}
        >
          <Tooltip title={!isOpen ? "Déconnexion" : ""} placement="right">
            <StyledListItemButton onClick={handleLogout}>
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: isOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Déconnexion" />}
            </StyledListItemButton>
          </Tooltip>
        </Box>
      </MotionDrawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#fff",
          transition: "margin-left 0.3s",
          marginLeft: isOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
          p: 3,
        }}
      >
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default Sidebar;
