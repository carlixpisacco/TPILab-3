import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import './ProductItem.css'
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, seller, title, category1, category2, condition, size, description, price, image, estado }) => { //el "estado cambia desde el carrito"
    const formattedProductTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();//pone primera letra en mayus y resto en minuscula.
    const formattedProductSeller = seller.charAt(0).toUpperCase() + seller.slice(1).toLowerCase();

    const navigate = useNavigate();

    const rol = null; //esta de prueba aca el rol lo voy a sacar del usecontext de usuario.

    const handleClickDetails = () => {
        navigate(`/product/${id}`, {
            state: {
                product: {
                    seller,
                    title,
                    category1,
                    category2,
                    condition,
                    size,
                    description,
                    price,
                    image,
                    estado,
                },
            },
        });
    };

    return (
        <div>
            <div className="card-container">
                <Card className="product-card">
                    <Card.Body>
                        <Card.Title>{formattedProductSeller}</Card.Title>
                    </Card.Body>
                    <Card.Img
                        height={300}
                        variant="top"
                        src={image !== "" ? image : "https://bit.ly/47NylZk"}
                    />

                    <Card.Body>
                        <Card.Subtitle>{formattedProductTitle}</Card.Subtitle>
                        <div className="mb-3">${price}</div>

                        {rol === 'comprador' && (
                            <Button className="btn btn-comprar d-block mb-2 mx-auto">Comprar</Button>
                        )}

                        {(rol === null || rol === '') && (
                            <Button className="btn btn-detalles d-block mx-auto" onClick={handleClickDetails}>Ver Detalles</Button>
                        )}

                        {rol === 'vendedor' && (
                            <>
                                {estado ? (
                                    <>
                                        <Button className="btn btn-editar d-block mb-2 mx-auto">Editar</Button>
                                        <Button className="btn btn-eliminar d-block mx-auto">Eliminar</Button>
                                    </>
                                ) : (
                                    <div className="alert alert-info d-block mx-auto">Este producto fue comprado</div>
                                )}
                            </>
                        )}

                        {rol === 'admin' && (
                            <>
                                <Button className="btn btn-eliminar d-block mx-auto">Eliminar Producto</Button>
                                {!estado && (
                                    <div className="alert alert-info d-block mx-auto">Este producto ya fue vendido</div>
                                )}
                            </>
                        )}
                    </Card.Body>

                </Card>
            </div>
        </div>
    )
}

ProductItem.propTypes = {
    id: PropTypes.number.isRequired,
    seller: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category1: PropTypes.string.isRequired,
    category2: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    estado: PropTypes.bool.isRequired,
};

export default ProductItem

