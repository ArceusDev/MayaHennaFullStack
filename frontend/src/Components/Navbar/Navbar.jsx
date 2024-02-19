import './Navbar.css';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


export default function Navbar(props){

    function toggleServices(){
        props.setServiceExpand(true)
        props.setProductExpand(false)
    }
    function toggleProducts(){
        props.setProductExpand(true)
        props.setServiceExpand(false)
    }
    return(
        <header className="navbar">
            <div className="navbar-container">
                <nav className="navbar-links-container">
                    <a href="#" className="navbar-btn" onClick={()=> {toggleServices()}}>Services</a>
                    <a href="#" className="navbar-btn" onClick={()=> {toggleProducts()}}>Products</a>
                    <Link to="/login" className="navbar-btn">Login</Link>

                    {/* <i className='nf nf-fa-sign_out logout-icon'></i> */}

                </nav>
            </div>
        </header>


    );
}


Navbar.propTypes = {
    setServiceExpand: PropTypes.func,
    setProductExpand: PropTypes.func,
};