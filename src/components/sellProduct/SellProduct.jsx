import BasicHeader from "../basicHeader/BasicHeader";
import './SellProduct.css';
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useState, useRef } from "react";

const SellProduct = () => {
    const [title, setTitle] = useState('');
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [condition, setCondition] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({
        title: false,
        category1: false,
        category2: false,
        condition: false,
        size: false,
        description: false,
        price: false,
        image: false,
    });

    const titleRef = useRef(null);
    const category1Ref = useRef(null);
    const category2Ref = useRef(null);
    const conditionRef = useRef(null);
    const sizeRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const imageRef = useRef(null);

    

    const handlePublicar = async (e) => {
        e.preventDefault();

        if (!title) {
            setErrors({ ...errors, title: true });
            titleRef.current.focus();
            return;
        }

        if (!category1) {
            setErrors({ ...errors, category1: true });
            category1Ref.current.focus();
            return;
        }

        if (!category2) {
            setErrors({ ...errors, category2: true });
            category2Ref.current.focus();
            return;
        }

        if (!condition) {
            setErrors({ ...errors, condition: true });
            conditionRef.current.focus();
            return;
        }

        if (!size) {
            setErrors({ ...errors, size: true });
            sizeRef.current.focus();
            return;
        }

        if (!description) {
            setErrors({ ...errors, description: true });
            descriptionRef.current.focus();
            return;
        }

        if (!price) {
            setErrors({ ...errors, price: true });
            priceRef.current.focus();
            return;
        }

        if (!image) {
            setErrors({ ...errors, image: true });
            imageRef.current.focus();
            return;
        }

        const producto = {
            productSeller: "username",
            productTitle: title,
            product1Category: category1,
            product2Category: category2,
            productCondition: condition,
            productSize: size,
            productDescription: description,
            productPrice: parseFloat(price),
            imageUrl: image,
            estado: true,
        };

        try {
            const response = await fetch('http://localhost:8000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            console.log('Producto publicado:', result);

            // Limpiar el formulario
            setTitle('');
            setCategory1('');
            setCategory2('');
            setCondition('');
            setSize('');
            setDescription('');
            setPrice('');
            setImage('');
            setErrors({});  // Limpiar los errores

        } catch (error) {
            console.error('Error al publicar el producto:', error);
        }
    };

    return (
        <div>
            <BasicHeader text={"PUBLICA TU PRODUCTO :)"} />
            <div className="contenedor-card">
                <Card className="mt-3 product-form">
                    <Card.Body>
                        <Card.Title className="card-title">Datos de tu producto</Card.Title>
                        <Form onSubmit={handlePublicar}>
                            {errors.title && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">El título es requerido</Alert>
                                </div>
                            )}
                            {errors.category1 && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">La categoría principal es requerida</Alert>
                                </div>
                            )}
                            {errors.category2 && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">La subcategoría es requerida</Alert>
                                </div>
                            )}
                            {errors.condition && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">El estado del producto es requerido</Alert>
                                </div>
                            )}
                            {errors.size && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">El tamaño es requerido</Alert>
                                </div>
                            )}
                            {errors.description && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">La descripción es requerida</Alert>
                                </div>
                            )}
                            {errors.price && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">El precio es requerido</Alert>
                                </div>
                            )}
                            {errors.image && (
                                <div className="mt-3 mb-3">
                                    <Alert variant="danger">La URL de la imagen es requerida</Alert>
                                </div>
                            )}
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Título del producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productTitle"
                                    id="title"
                                    value={title}
                                    onChange={(e) => {
                                        setErrors({ ...errors, title: false });
                                        setTitle(e.target.value);
                                    }}
                                    ref={titleRef}
                                    className={errors.title && "border border-danger"}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Categoría:</Form.Label>
                                <Form.Control as="select"
                                    name="product1Category"
                                    id="category1"
                                    value={category1}
                                    onChange={(e) => {
                                        setErrors({ ...errors, category1: false });
                                        setCategory1(e.target.value);
                                    }}
                                    ref={category1Ref}
                                    className={errors.category1 && "border border-danger"}
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="mujer">Mujer</option>
                                    <option value="hombre">Hombre</option>
                                    <option value="niño">Niño</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Subcategoría:</Form.Label>
                                <Form.Control as="select"
                                    name="product2Category"
                                    id="category2"
                                    value={category2}
                                    onChange={(e) => {
                                        setErrors({ ...errors, category2: false });
                                        setCategory2(e.target.value);
                                    }}
                                    ref={category2Ref}
                                    className={errors.category2 && "border border-danger"}
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="partes de arriba">Parte de Arriba</option>
                                    <option value="partes de abajo">Parte de Abajo</option>
                                    <option value="accesorios">Accesorio</option>
                                    <option value="calzados">Calzado</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Estado:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="productCondition"
                                    id="condition"
                                    value={condition}
                                    onChange={(e) => {
                                        setErrors({ ...errors, condition: false });
                                        setCondition(e.target.value);
                                    }}
                                    ref={conditionRef}
                                    className={errors.condition && "border border-danger"}
                                >
                                    <option value="" disabled>Elige una opción</option>
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Talle:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="productSize"
                                    id="size"
                                    value={size}
                                    onChange={(e) => {
                                        setErrors({ ...errors, size: false });
                                        setSize(e.target.value);
                                    }}
                                    ref={sizeRef}
                                    className={errors.size && "border border-danger"}
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
                                <Form.Label className="label">Descripción:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="productDescription"
                                    id="description"
                                    rows="3"
                                    value={description}
                                    onChange={(e) => {
                                        setErrors({ ...errors, description: false });
                                        setDescription(e.target.value);
                                    }}
                                    ref={descriptionRef}
                                    className={errors.description && "border border-danger"}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Precio:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    id="productPrice"
                                    value={price}
                                    onChange={(e) => {
                                        setErrors({ ...errors, price: false });
                                        setPrice(e.target.value);
                                    }}
                                    ref={priceRef}
                                    className={errors.price && "border border-danger"}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">URL de la Imagen:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imageUrl"
                                    id="imageUrl"
                                    value={image}
                                    onChange={(e) => {
                                        setErrors({ ...errors, image: false });
                                        setImage(e.target.value);
                                    }}
                                    ref={imageRef}
                                    className={errors.image && "border border-danger"}
                                />
                            </Form.Group>
                            <Button type="submit" className="btn btn-publicar d-block mx-auto">
                                Publicar producto
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default SellProduct;