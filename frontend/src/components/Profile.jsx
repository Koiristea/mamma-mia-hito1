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
  if (user) {
    return (
      <div className="container mt-5">
        <div className="card">
         <div className="card-header">
            <h2 className="fs-2">Perfil de Usuario</h2>
          </div>
          <div className="card-body">
            <p className="email card-text fs-5"><strong>Email:</strong> {user.email || "No disponible"}</p>
            <button onClick={logout} className="close btn btn-danger">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;