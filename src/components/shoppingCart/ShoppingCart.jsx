import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    const [cart, setCart] = useState([{ name: 'Producto de prueba', price: 100 }]);

    const addCart = () => {
        const newProduct = { name: 'Nuevo producto', price: 50 };
        setCart([...cart, newProduct]);
    };

    const remove = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const costoTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    return (
        <Card className="p-3">
            <h2>Productos</h2>
            <Card.Body>
                <ul>
                    {cart.map((product, index) => (
                        <li key={index}>
                            {product.name} - ${product.price}
                            <Button className="btn btn-primary ml-2" onClick={() => remove(index)}>Eliminar producto</Button>
                        </li>
                    ))}
                </ul>
                <p>Total: ${costoTotal()}</p>
                <Button className="btn btn-success mt-3" onClick={addCart}>Agregar producto</Button>
            </Card.Body>
            <div className="mt-3">
                <h3>Selecciona tu rol:</h3>
                <Link className="btn btn-info mr-2" to="/login?role=vendedor">Vendedor</Link>
                <Link className="btn btn-warning" to="/login?role=comprador">Comprador</Link>
            </div>
        </Card>
    );
};

export default ShoppingCart;
