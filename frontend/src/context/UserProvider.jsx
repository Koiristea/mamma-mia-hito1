import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true);

  const logout = () => setToken(false);

  const value = useMemo(() => ({ token, logout }), [token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default UserProvider;