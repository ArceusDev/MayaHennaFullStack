import './css/navbar.css';

export default function MainPage(){
    return(
        // <header className="navbar">
        //     <div className="navbar-container">
        //         <h2 className="navbar-logo">maya hina</h2>
        //         <nav className="navbar-links-container">
        //             <a href="#" className="navbar-btn">Services</a>
        //             <a href="#" className="navbar-btn">Products</a>
        //             {/* <a href="#" className="navbar-btn">Logout</a> */}
        //             <i className='nf nf-fa-sign_out logout-icon'></i>
        //         </nav>
        //     </div>
        // </header>
        <header className="navbar">
            <div className="navbar-container">
                <nav className="navbar-links-container">
                    <a href="#" className="navbar-btn">Services</a>
                    <a href="#" className="navbar-btn">Products</a>
                    {/* <i className='nf nf-fa-sign_out logout-icon'></i> */}
                    <a href="#" className="navbar-btn">Login</a>


                </nav>
            </div>
        </header>


    );
}
