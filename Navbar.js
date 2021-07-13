import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
function Navbar() {
    const [click, setClick] = useState(false);

    const handleMobileMenu = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    let navClasses= `nav-menu ${click ? 'nav-menu-active' : 'nav-menu-inactive'} `;
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo">
                        DRWNG <i class="fas fa-pencil-ruler"></i>
                    </Link>
                    <div className='menu-icon' onClick ={ () => {handleMobileMenu(); console.log(click);}}>
                        <div >icon</div>
                    </div>
                    <ul className={navClasses}>
                        <li className='nav-item'>
                            <Link to='/home' className='nav-links' >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/log-in' className='nav-links' >
                                Log In
                            </Link>
                        </li>
                        
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links' >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
