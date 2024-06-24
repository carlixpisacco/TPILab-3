import { useContext, useState } from "react";
import { Form, Button, Card, Alert, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/Authentication.context"; 
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, error } = useContext(AuthenticationContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            // Mostrar mensaje de error si los campos están vacíos
            return;
        }

        // Llamar a la función de login del contexto
        await handleLogin(email, password);
        navigate('/');
    };

    return (
        <div>
            <Card>
                <h3>¡Bienvenidos!</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            value={email}
                            required
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl
                            type="password"
                            value={password}
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                </Form>

                {error && (
                    <div className="w-100 mt-3">
                        <Alert variant="danger">La dirección de correo electrónico ya está siendo utilizada. Por favor, usa un correo electrónico diferente.</Alert>
                    </div>
                )}

                <div className="mt-3">
                    <p>Sos nuevo? | <Link to="/registerForm">Registrarse</Link></p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
