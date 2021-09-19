import React, {useState,useEffect,memo} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Button} from './mainPageComponents/Button';
import PencilRulerIcon from '../Icons/pencil-ruler-solid.svg'
let Wrapper=styled.div`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
.navbar {
    background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 98;
  }
  
  .navbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    max-width: 1500px;
  }
  
  .navbar-logo {
    color: #fff;
    justify-self: start;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    >img{
      width: 30px;
      margin-left: 10px;
    }
  }
  
  .fa-typo3 {
    margin-left: 0.5rem;
    font-size: 1.8rem;
  }
  
  .nav-menu {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 60vw;
    justify-content: end;
    margin-right: 2rem;
  }
  
  .nav-item {
    height: 80px;
  }
  
  .nav-links {
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
  }
  
  .nav-links:hover {
    border-bottom: 4px solid #fff;
    transition: all 0.2s ease-out;
  }

  .nav-nolinks{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 43px;
    border: 1px solid #fff;
    border-radius: 2px;
    
  }
  
  .fa-bars {
    color: #fff;
  }
  
  .nav-links-mobile {
    display: none;
  }
  
  .menu-icon {
    display: none;
  }
  
  @media screen and (max-width: 960px) {
    .NavbarItems {
      position: relative;
    }
    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 90vh;
      position: absolute;
      top: 80px;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
    }
    .nav-menu.active {
      background: #242222;
      left: 0;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }
    .nav-links {
      text-align: center;
      padding: 2rem;
      width: 100%;
      display: table;
    }
    .nav-links:hover {
      background-color: #fff;
      color: #242424;
      border-radius: 0;
    }
    .navbar-logo {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(25%, 50%);
    }
    .menu-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
    }
  
    .fa-times {
      color: #fff;
      font-size: 2rem;
    }
  
    .nav-links-mobile {
      display: block;
      text-align: center;
      margin: 2rem auto;
      border-radius: 4px;
      width: 80%;
      text-decoration: none;
      font-size: 1.5rem;
      background-color: transparent;
      color: #fff;
      padding: 14px 20px;
      border: 1px solid #fff;
      transition: all 0.3s ease-out;
    }
  
    .nav-links-mobile:hover {
      background: #fff;
      color: #242424;
      transition: 250ms;
    }
    
  }
`

function Navbar() {

    const [userName, setUserName] = useState('');

    const [click, setClick] = useState(false);

    const handleMobileMenu = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const LogOut = ()=>{
        localStorage.setItem('token','');
        window.location.reload();
    }

    let navClasses= `nav-menu ${click ? 'nav-menu-active' : 'nav-menu-inactive'} `;

    useEffect(() => {
      (async ()=>{
          try {
              
              const response = await fetch(require('../scripts/apiLocation')+'/api/getuserinfo',{
                  method: 'GET',
                  mode: 'cors',
                  headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
              })
              const parsedResponse = await response.json();
              if(response.ok){
                  setUserName(parsedResponse.user_name);
              }
              else{
                  console.log(response.statusText)
                  setUserName('')
                  
              }
          } catch (error) {
              console.error(error);
          }
      })()
  }, [])

    return (
        <Wrapper>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo">
                        DRWNG <img src={PencilRulerIcon} alt="icon" />
                    </Link>
                    <div className='menu-icon' onClick ={ () => {handleMobileMenu(); console.log(click);}}>
                        <i className={click?'fas fa-times':'fas-fa-bars'} />
                    </div>
                    <ul className={navClasses}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' >
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/contact' className='nav-links' >
                                Contact
                            </Link>
                        </li>
                        <li className='nav-item'>
                            {
                            userName?
                            <div className='nav-nolinks' >
                                {/* aici trebuie sa adaugam o componenta pentru avatarul/butonul afisat cand userul este logat */}
                                {userName}
                            </div>:
                            <Link to='/loginRegister' className='nav-links' >
                                Log in
                            </Link>
                            }
                        </li>
                    </ul>
                    {userName?<Button buttonStyle='btn--outline' onClick={LogOut}>Log out</Button>: 
                    <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                </div>
            </nav>
        </Wrapper>
    );
}

export default memo(Navbar)
