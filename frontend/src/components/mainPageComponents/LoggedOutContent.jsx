import React from 'react';
import styled from 'styled-components';
import Section from './Section.js'
let Wrapper=styled.div`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'PT Sans', sans-serif;
  }
`

export default function LoggedOutContent() {
    return (
        <Wrapper>
            <Section />
        </Wrapper>
    )
}
