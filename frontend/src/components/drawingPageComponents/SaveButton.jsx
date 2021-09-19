import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    >button{
        position: relative;
        width: 100%;
        padding: 5px 0;
        border: none;
        background: orange;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 105%;
        box-sizing: border-box;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
        :hover{
            background: #ff9900;
        }
        :active{
            border-bottom: 1px solid black;
            border-right: 1px solid black;
        }
    }

`

export default function SaveButton({saveActivator, setSaveActivator}) {
    return (
        <Wrapper onClick={()=>setSaveActivator(!saveActivator)}>
            <button>Save</button>
        </Wrapper>
    )
}
