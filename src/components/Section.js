import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Section.css';

function Section() {
  return (
    <div className='container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>DRAW YOUR PATH</h1>
      <p>What are you waiting for?</p>
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
  );
}

export default Section;