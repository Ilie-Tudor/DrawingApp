import React,{memo} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import facebookIcon from '../Icons/facebook.svg'
import instagramIcon from '../Icons/instagram.svg'
import pencilRulerIcon  from '../Icons/pencil-ruler-solid.svg'

const Wrapper = styled.div`
    .footer-container {
    background-color: #242424;
    padding: 4rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .footer-links {
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: center;
  }

  .footer-link-wrapper {
    display: flex;
  }
  
  .footer-link-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    text-align: left;
    width: 180px;
    box-sizing: border-box;
  }
  
  .footer-link-items h2 {
    margin-bottom: 16px;
  }
  
  .footer-link-items > h2 {
    color: #fff;
  }
  
  .footer-link-items a {
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
  }
  
  .footer-link-items a:hover {
    color: #e9e9e9;
    transition: 0.3s ease-out;
  }
  
  .footer-email-form h2 {
    margin-bottom: 2rem;
  }
  
  .footer-input::placeholder {
    color: #b1b1b1;
  }

  .social-icon-link {
    position: relative;
    width: 30px;
    padding: 10px;

  }
  
  .social-media {
    max-width: 1000px;
    width: 100%;
  }
  
  .social-media-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 40px auto 0 auto;
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .social-logo {
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    margin-left: 10px;
    >img{
      width: 30px;
      margin-left: 5px;
    }
  }
  
  .website-rights {
    color: #fff;
    margin-bottom: 16px;
  }
  
`;


function Footer(){
    return(
        <Wrapper>

        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to='/about'>About page</Link>
                        <Link to='/terms-of-service'>Terms of Service</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Social Media</h2>
                        <Link to='#'>Tudor's Linkedin</Link>
                        <Link to='#'>Alex's Linkedin</Link>
                        <Link to='#'>Daniel's Linkedin</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Contact Us</h2>
                        <Link to='/contact'>Contact page</Link>
                        <Link to='#'>0741549772</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                <div className='footer-logo'>
                    <Link to='/' className='social-logo'>
                    <div>DRWNG</div>
                    <img src={pencilRulerIcon} alt="logo" />
                    </Link>
                </div>
                <small className='website-rights'>DRWNG © 2021</small>
                <div className='social-icons'>
                    <Link
                    className='social-icon-link facebook'
                    to='/'
                    target='_blank'
                    aria-label='Facebook'
                    >
                    <img src={facebookIcon} alt="facebook icon" />
                    </Link>
                    <Link
                    className='social-icon-link instagram'
                    to='/'
                    target='_blank'
                    aria-label='Instagram'
                    >
                    <img src={instagramIcon} alt="instagram icon" />
                    </Link>
                </div>
                </div>
            </section>
        </div>
        </Wrapper>
    );
}
export default memo(Footer)