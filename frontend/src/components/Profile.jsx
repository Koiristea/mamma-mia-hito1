import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user, fetchProfile, logout, isLoading, error } = useContext(UserContext);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  // Muestra los datos del usuario si está autenticado
  if (user) {
    return (
      <div className="container mt-5">
        <div className="card">
         <div className="card-header">
            <h2>Perfil de Usuario</h2>
          </div>
          <div className="card-body">
            <p className="email card-text"><strong>Email:</strong> {user.email || "No disponible"}</p>
            <button onClick={logout} className="close btn btn-danger">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;