import './styles/profile.css'
function Profile() {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Perfil de Usuario</h2>
        </div>
        <div className="card-body">
          <p className="email card-text"><strong>Email:</strong> usuario@gmail.com</p>
          <button className="close btn btn-danger">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
