import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Usualmente se inicializa como null



  const handleLogin = () => {
    const storedToken = localStorage.getItem('token');
    console.log("token", storedToken);
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const userData = {
          id: decodedToken.sub,
          username: decodedToken.username,
          email: decodedToken.email,
          status: decodedToken.status,
          rol: decodedToken.rol,
        };

        setUser(userData); // Establecer el usuario en el estado
        localStorage.setItem('user', JSON.stringify(userData)); // Guardar el usuario en localStorage si es necesario
        console.log('user', userData)
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
        setError('Token inválido');
      }
    } else {
      setError('No hay token disponible');
    }
  };

  useEffect(() => {
    // Esta función se ejecutará al cargar el componente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Usuario recuperado:1", parsedUser);
      setUser(parsedUser)
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("cerrando sesion", user);
  };

  const handleRegister = async (formData) => {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      if (response.ok) {
        setError(null);
        return true;
      } else {
        setError(responseData.message);
        return false;
      }
    } catch (error) {
      setError('Error en la solicitud');
      return false;
    }
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout, handleRegister, error }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticationContext;
