import React from 'react';
import { Button } from './Button';
import styled from 'styled-components';
let Wrapper=styled.div`
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}

.container {
  
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
}

.container > h1 {
  color: #fff;
  font-size: 100px;
  margin-top: -100px;
}

.container > p {
  margin-top: 8px;
  color: #fff;
  font-size: 32px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
}

.btns {
  margin-top: 32px;
}

.btns .btn {
  margin: 6px;
}

.fa-play-circle {
  margin-left: 4px;
}

@media screen and (max-width: 960px) {
  .container > h1 {
    font-size: 70px;
    margin-top: -150px;
  }
}

@media screen and (max-width: 768px) {
  .container > h1 {
    font-size: 50px;
    margin-top: -100px;
  }

  .container > p {
    font-size: 30px;
  }

  .btn-mobile {
    display: block;
    text-decoration: none;
  }

  .btn {
    width: 100%;
  }
}
`
function Section() {
  return (
    <Wrapper>
      <div className='container'>
        <video src='/videos/video-1.mp4' autoPlay loop muted />
        <h1>DRAW YOUR PATH</h1>
        <p>Your future made by pen and paper</p>
        <div className='btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
        
        </div>
      </div>
    </Wrapper>
  );
}

export default Section;