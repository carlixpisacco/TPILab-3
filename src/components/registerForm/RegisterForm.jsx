import { useContext, useState } from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../../services/authentication/Authentication.context';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    rol: '',
    status: true,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { handleRegister, error } = useContext(AuthenticationContext);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    if (formData.password !== confirmPassword) {
      setLocalError("No coinciden las contraseñas.");
      return;
    }
  
    try {
      await handleRegister(formData);
      setSuccess("Registro exitoso.");
      setLocalError(null);
      navigate("/login");
    } catch (err) {
      setLocalError(err.message || "Error en el registro.");
    }
  };
  

  return (
    <Card className="p-3 px-5 shadow">
      <h3>Nuevo Usuario</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup className='mb-4'>
          <FormLabel>Nombre</FormLabel>
          <FormControl
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Ingresar nombre"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className='mb-4'>
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            name="email"
            value={formData.email}
            placeholder="Ingresar email"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className='mb-4'>
          <FormLabel>Contraseña</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={formData.password}
            placeholder="Ingresar contraseña"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className="mb-4">
          <FormLabel>Confirmar Contraseña</FormLabel>
          <FormControl
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>

        {localError && (
          <Alert variant="danger" className="mt-3">
            {localError}
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mt-3">
            {success}
          </Alert>
        )}

        <input type="hidden" name="rol" value={formData.rol} />

        <Button type="submit" className="btn btn-primary" onClick={() => setFormData({ ...formData, rol: "vendedor" })} >Crear usuario como vendedor </Button>

        <Button type="submit" className="btn btn-primary" onClick={() => setFormData({ ...formData, rol: "comprador" })} >Crear usuario como comprador </Button>

        <Link to={"/"}>
          <br />Volver
        </Link>
      </Form>
    </Card>
  );
}

export default RegisterForm;
