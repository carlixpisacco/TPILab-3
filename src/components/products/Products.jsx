import PropTypes from "prop-types";
import ProductItem from "../productItem/ProductItem";
import './Products.css'

const Products = ({ products }) => {
  let rol = null;
  let username = "kevin"; //username esta dentro del usuario, dentro del context.

  return (
    <div>
      <div className="products-container">
        {products.map((product, index) => {
          // condición para el rol de comprador o nulo
          if (!rol || rol === "comprador") {
            // renderiza solo los productos cuyo estado es "true"
            if (product.estado) {
              return (
                <ProductItem
                  key={index}
                  id={product.id}
                  seller={product.productSeller}
                  title={product.productTitle}
                  category1={product.product1Category}
                  category2={product.product2Category}
                  condition={product.productCondition}
                  size={product.productSize}
                  description={product.productDescription}
                  price={product.productPrice}
                  image={product.imageUrl}
                  estado={product.estado}
                />
              );
            }
          }
          // condición para el rol de vendedor
          else if (rol === "vendedor") {
            // renderiza solo los productos del vendedor actual
            if (product.productSeller === username) {
              return (
                <ProductItem
                  key={index}
                  id={product.id}
                  seller={product.productSeller}
                  title={product.productTitle}
                  category1={product.product1Category}
                  category2={product.product2Category}
                  condition={product.productCondition}
                  size={product.productSize}
                  description={product.productDescription}
                  price={product.productPrice}
                  image={product.imageUrl}
                  estado={product.estado}
                />
              );
            }
          }
          // condición para el rol de admin
          else if (rol === "admin") {
            // renderiza todos los productos
            return (
              <ProductItem
                key={index}
                id={product.id}
                seller={product.productSeller}
                title={product.productTitle}
                category1={product.product1Category}
                category2={product.product2Category}
                condition={product.productCondition}
                size={product.productSize}
                description={product.productDescription}
                price={product.productPrice}
                image={product.imageUrl}
              />
            );
          }
          return null; // si no se cumple ninguna condición, retorna null
        })}
      </div>
    </div>
  )
}

Products.propTypes = {
  products: PropTypes.array,
};

export default Products
