import BasicHeader from "../basicHeader/BasicHeader"
import './ProductDetails.css'
import { Button } from "react-bootstrap";
import { useLocation} from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const { seller,title, category1, category2, condition, size, description, price, image} = location.state.product;
  const formattedProductTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();//pone primera letra en mayus y resto en minuscula.
  const formattedProductSeller = seller.charAt(0).toUpperCase() + seller.slice(1).toLowerCase();

  let rol = null 
  return (
    <>
      <BasicHeader text={"DETALLES DEL PRODUCTO"} />
      <div className="product-container">
        <div className="img-container">
          <img src={image} alt="Product" className="product-img" />
        </div>
        <div className="data-container">
          <div><h2 className="product-title">{formattedProductTitle}</h2></div>
          <p className="text-price"><span className="text-label">Precio:</span> ${price}</p>
          <p className="text-seller"><span className="text-label">Vendedor:</span> {formattedProductSeller}</p>
          <p className="text-category"><span className="text-label">Categoría:</span> {category1} / {category2}</p>
          <p className="text-condition"><span className="text-label">Estado:</span> {condition}</p>
          <p className="text-size"><span className="text-label">Talle:</span> {size}</p>
          <p className="text-description">{description}</p>

          {rol === 'comprador' && (
          <Button className="btn btn-comprar mx-auto"> Comprar </Button>
          )}

        </div>

      </div>
    </>
  )
}

export default ProductDetails
