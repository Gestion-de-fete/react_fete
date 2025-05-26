import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  // Simulations des données, remplace par tes données réelles ou via API
  const nombreClients = 34;
  const nombreUtilisateurs = 10;
  const nombreEntreesSorties = 57;

  // Exemple de données pour l'histogramme (par exemple nombre d'entrées sur une semaine)
  const dataHistogramme = [
    { jour: "Lun", entrees: 8 },
    { jour: "Mar", entrees: 12 },
    { jour: "Mer", entrees: 15 },
    { jour: "Jeu", entrees: 10 },
    { jour: "Ven", entrees: 20 },
    { jour: "Sam", entrees: 5 },
    { jour: "Dim", entrees: 9 },
  ];

  return (
    <div className="mb-3">
      <div className="container-fluid p-3 bg-light mb-4 rounded">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="d-flex justify-content-between align-items-center p-4 bg-white border border-secondary shadow-sm rounded">
              <i className="bi bi-people-fill fs-1 text-primary"></i>
              <div className="text-end">
                <span className="text-muted fw-semibold">Clients</span>
                <h2 className="mb-0">{nombreClients}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="d-flex justify-content-between align-items-center p-4 bg-white border border-secondary shadow-sm rounded">
              <i className="bi bi-person-badge-fill fs-1 text-success"></i>
              <div className="text-end">
                <span className="text-muted fw-semibold">Utilisateurs</span>
                <h2 className="mb-0">{nombreUtilisateurs}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="d-flex justify-content-between align-items-center p-4 bg-white border border-secondary shadow-sm rounded">
              <i className="bi bi-box-arrow-in-right fs-1 text-warning"></i>
              <div className="text-end">
                <span className="text-muted fw-semibold">Entrées / Sorties</span>
                <h2 className="mb-0">{nombreEntreesSorties}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={dataHistogramme} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entrees" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  
  );
}

export default Dashboard;
