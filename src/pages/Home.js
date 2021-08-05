import React from 'react';
import styled from 'styled-components';
import Section from '../components/mainPageComponents/Section.js'
import Footer from '../components/mainPageComponents/Footer.js'
let Wrapper=styled.div`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'PT Sans', sans-serif;
  }
  
  .home,
  .services,
  .products,
  .sign-up {
    display: flex;
    height: 90vh;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }
 
  .services {
  
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 100px;
  }
  
  .products {
    
    background-position: center;
    background-size: fill;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 100px;
  }
  
  .sign-up {
    
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 100px;
  }
`

function Home(){
    return(
        <Wrapper>
            <Section />
            <Footer />
        </Wrapper>
    );
}

export default Home;