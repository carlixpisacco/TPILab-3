import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const userValueString = localStorage.getItem("user");
    console.log("Valor de usuario en localStorage:", userValueString);

    if (userValueString) {
      try {
        const parsedUser = JSON.parse(userValueString);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error.message);
        localStorage.removeItem("user"); // Elimina el usuario si hay un error al parsear
      }
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const responseData = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);

      if (response.ok) {
        const { token, user: userData } = responseData;
        setUser(userData); // Almacena los datos del usuario en el contexto
        localStorage.setItem("token", token); // Guarda el token en localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        setError(null);
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      setError('Error en la solicitud');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    console.log(setUser, "cerro sesion")
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
  children: PropTypes.object.isRequired,
};

export default AuthenticationContext;

