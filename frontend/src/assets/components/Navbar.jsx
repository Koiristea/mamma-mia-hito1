import {Link} from 'react-router-dom'
const Navbar = () => {
  const total = 25000;
  const token = false;
  return (
    <nav className="navbar navbar-expand navbar-light bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white border border-white rounded mx-2">
                Pizzería Mamma Mia!
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link text-white border border-white rounded mx-2">
                🍕Home
              </Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-white border border-white rounded mx-2">
                    🔓Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link text-white border border-white rounded mx-2">
                    🔒Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white border border-white rounded mx-2">
                    🔐Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-white border border-white rounded mx-2">
                    🔐Register
                  </Link>
                </li>
                {/*<li className="nav-item">
                  <Link to="/profile" className="nav-link text-white border border-white rounded mx-2">
                    👤Profie
                  </Link>
                </li>*/}
              </>
            )}
          </ul>
          <Link to="/cart" className="btn total border border-white text-white">
            🛒 Total: ${total.toLocaleString()}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;