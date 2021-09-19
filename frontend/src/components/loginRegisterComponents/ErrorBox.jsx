import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    border: 1px solid red;
    background: rgba(255, 0, 0, 0.3);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px;
    color: darkred;
`

export default function ErrorBox({errMsg, style}) {
    return (
        <>
        {errMsg?
            <Wrapper style={style}>
                {errMsg}
            </Wrapper>
            :""}
        </>
    )
}
