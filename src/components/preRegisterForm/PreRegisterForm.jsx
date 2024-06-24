
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStore, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'; 
import { useNavigate } from "react-router-dom";
import './PreRegisterForm.css'

const PreRegisterForm = () => {

    const navigate = useNavigate();

    const handleTypeForm = (name) => {
        navigate("/registerform", { state: { type: name } });
    };

    const handleBackButtonClick = () => {
        navigate("/");
    };

    return (
        <>
            <header className="header">
                <div className="container-fluid header-container">
                    <div className="row align-items-center header-row">
                        <div className="col-auto">
                            <Button className='button-back-bheader' variant="primary" onClick={handleBackButtonClick}>
                                <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button'>Volver al menú principal</p>
                            </Button>
                        </div>
                        <div className="col-auto text-header">
                            <span className="text" style={{ marginLeft: '100px' }}> HOLA :)</span>
                        </div>
                    </div>
                </div>
            </header>
            <p className='texto-preregister'> Elige cómo deseas registrarte:</p>
            <div className='pre-register-container'>
                <div className='comprador-container'>
                    <Button className='btn btn-primary card-box comprador' onClick={() => handleTypeForm("comprador")}>
                        <div className='card-icon'>
                            <FontAwesomeIcon icon={faShoppingCart} size="3x" />
                        </div>
                        <h2>COMPRADOR</h2>
                    </Button>
                </div>
                <div className='vendedor-container'>
                    <Button className='btn btn-primary card-box vendedor' onClick={() => handleTypeForm("vendedor")}>
                        <div className='card-icon'>
                            <FontAwesomeIcon icon={faStore} size="3x" />
                        </div>
                        <h2>VENDEDOR</h2>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default PreRegisterForm
