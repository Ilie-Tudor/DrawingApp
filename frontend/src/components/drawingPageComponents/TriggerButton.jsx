import React from 'react'
import styled from 'styled-components'

let Wrapper = styled.button`
    position: relative;
    display: inline-block;
    padding: 5px 0px;
    width: 35px;
    cursor: pointer;
` 

function TriggerButton({className, children, insideComponent, state, changeState, style, onColor = 'grey', offColor='lightgray'}) {



    return (
        <Wrapper className = {className} onClick = {()=>{changeState(!state)}}
                style={{...style, background: state?onColor:offColor}}>    
            {insideComponent}
        </Wrapper>
    )
}

export default TriggerButton
