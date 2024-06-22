import BasicHeader from "../basicHeader/BasicHeader";
import './SellProduct.css';
import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";

const SellProduct = () => {
    const [categoria, setCategoria] = useState('');
    const [talle, setTalle] = useState('');
    const [estado, setEstado] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    const handlePublicar = () => {
        // Aquí puedes manejar la lógica de publicación, por ejemplo, enviar los datos a un servidor
        console.log({
          categoria,
          talle,
          estado,
          descripcion,
          precio,
          imagen,
        });

        setCategoria('');
        setTalle('');
        setEstado('');
        setDescripcion('');
        setPrecio('');
        setImagen('');
      };

    return (
        <div>
            <BasicHeader text={"PUBLICA TU PRODUCTO :)"} />
            <div className="contenedor-card">
                <Card className="mt-3 product-form">
                    <Card.Body>
                        <Card.Title className="card-title">Datos de tu producto</Card.Title>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="categoria" className="label">Categoría:</Form.Label>
                                <Form.Control as="select"
                                    id="categoria"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="partes de arriba">Parte de Arriba</option>
                                    <option value="partes de abajo">Parte de Abajo</option>
                                    <option value="accesorios">Accesorio</option>
                                    <option value="calzados">Calzado</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="talle" className="label">Talle:</Form.Label>
                                <Form.Control
                                    as="select"
                                    id="talle"
                                    value={talle}
                                    onChange={(e) => setTalle(e.target.value)}
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="estado" className="label">Estado:</Form.Label>
                                <Form.Control
                                    as="select"
                                    id="estado"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="descripcion" className="label">Descripción:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    id="descripcion"
                                    rows="3"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="precio" className="label">Precio:</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="precio"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="imagen" className="label">URL de la Imagen:</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="imagen"
                                    value={imagen}
                                    onChange={(e) => setImagen(e.target.value)}
                                />
                            </Form.Group>

                            <Button className="btn btn-publicar d-block mx-auto"
                                onClick={handlePublicar}>
                                Publicar producto
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default SellProduct
