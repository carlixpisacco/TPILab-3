import { Button} from 'react-bootstrap'; //VER SI AGREGO BADGE PARA CONTADOR DE PRODUCTOS EN EL CARRITO.
import './Header.css'
import SearchBar from '../searchBar/SearchBar';
import PropTypes from "prop-types";
import Selects from '../selects/Selects';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import AuthenticationContext from '../../services/authentication/Authentication.context';

const Header = ({ onSearchBar, onSearchSelect }) => {
    const [hombreValue, setHombreValue] = useState('');
    const [mujerValue, setMujerValue] = useState('');
    const [ninoValue, setNinoValue] = useState('');
    const { handleLogout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    let rol = "vendedor";

    const handleClickNewProduct = () => {
        navigate("/addProduct");
    };
   
    const handleBackButtonClick = () => {
        clearSelects();
        onSearchBar('');
    };

    const handleSearchBar = (searchBarTerm) => {
        if (searchBarTerm.trim() !== '') { //el trim lo que  hace es sacar los espacios en blanco de lo ingresado, permitiendo que si solo se pusieron espacios vacios no se cuente como un ingreso valido
            clearSelects();
        }
        onSearchBar(searchBarTerm);
    };

    const clearSelects = () => {
        setHombreValue('');
        setMujerValue('');
        setNinoValue('');
    };


    const handleSelectChange = (value, type) => {
        // Esta función resetea los valores de los select cada vez que alguien presione una nueva opción. "value" almacena el valor de la opción elegida en el select que es enviada desde el componente hijo "selects"
        if (type === 'hombre') {
            setMujerValue('');
            setNinoValue('');
            setHombreValue(value);

        } else if (type === 'mujer') {
            setHombreValue('');
            setNinoValue('');
            setMujerValue(value);

        } else if (type === 'niño') {
            setHombreValue('');
            setMujerValue('');
            setNinoValue(value); //setear con value hace que el select muestre en vez de "niño" el valor elegido en el select. 
        }

        onSearchSelect([value, type])
    };

    const handleLogoutAndRedirect = () => {
        console.log("cerrando sesion")
        handleLogout();
        navigate("/login");
    };

    const handleClickLogin = () => {
        navigate("/login");
    };

    const handleClickRegister = () => {
        navigate("/preRegister");
    };

    const handleShoppingCartClick = () => {
        navigate('/shoppingCart');
    };

    return (
        <header className="header">
            <div className="container-fluid header-container">
                <div className="row align-items-center header-row">
                    <div className="col-auto">
                        {/* Botón volver a mostrar todas las card*/}

                        <Button className='button-back' variant="primary" onClick={handleBackButtonClick}>
                            <FontAwesomeIcon className='flecha-header' icon={faArrowLeft} />
                        </Button>
                    </div>

                    {/* input de busqueda*/}
                    <SearchBar onChangeBar={handleSearchBar} />

                    {/* Selects*/}
                    <div className="col-auto select-women">
                        <Selects
                            label="Mujer"
                            value={mujerValue}
                            onChangeSelects={(value) => handleSelectChange(value, 'mujer')} //"value contiene "partes de arriba, partes de abajo, etc" recibidas del componente hijo, luego paso ese valor a la funcion que resetea los valores 
                        />
                    </div>
                    <div className="col-auto select-men">
                        <Selects
                            label="Hombre"
                            value={hombreValue}
                            onChangeSelects={(value) => handleSelectChange(value, 'hombre')}
                        />
                    </div>
                    <div className="col-auto select-children">
                        <Selects
                            label="Niño"
                            value={ninoValue}
                            onChangeSelects={(value) => handleSelectChange(value, 'niño')}
                        />
                    </div>

                    {/* botones*/} 
                    {rol === null && (
                        <>
                            <div className="col-auto">
                                <Button variant="success" className='btn-register' onClick={handleClickRegister}>Registrarse</Button>
                            </div>
                            <div className="col-auto">
                                <Button variant="info" className='btn-login' onClick={handleClickLogin}>Ingresar</Button>
                            </div>
                        </>
                    )}

                    {rol === "comprador" && (
                        <div className="col-auto">
                            <Button variant="info" className='btn-shopcart' onClick={handleShoppingCartClick}>
                                <FontAwesomeIcon icon={faShoppingCart} className='carrito'/>
                            </Button>
                        </div>
                    )}

                    {rol === "vendedor" && (
                        <div className="col-auto">
                            <Button variant="info" className='btn-sale' onClick={handleClickNewProduct}>Subir Producto</Button>
                        </div>
                    )}

                    {rol != null && (
                        <div className="col-auto">
                            <Button variant="info" className='btn-logout' onClick={handleLogoutAndRedirect} >Cerrar Sesión</Button>
                        </div>
                    )}

                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    onSearchBar: PropTypes.func.isRequired,
    onSearchSelect: PropTypes.func.isRequired,
};

export default Header

