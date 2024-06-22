import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './BasicHeader.css';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


const BasicHeader = ({ text }) => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate("/");
    };
    return (
        <div>
            <header className="header">
                <div className="container-fluid header-container">
                    <div className="row align-items-center header-row">
                        <div className="col-auto">
                            <Button className='button-back-bheader' variant="primary" onClick={handleBackButtonClick}>
                                <FontAwesomeIcon className='flecha' icon={faArrowLeft} /> <p className='text-button'>Volver al menú principal</p>
                            </Button>
                        </div>
                        <div className="col-auto text-header">
                            <span className="text">{text}</span>
                        </div>
                        <div className="col-auto logout-bheader-div" >
                            <Button variant="info" className='logout-bheader'>Cerrar Sesión</Button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

BasicHeader.propTypes = {
    text: PropTypes.string,

};
export default BasicHeader
