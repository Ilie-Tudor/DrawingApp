import React, { memo } from 'react'
import styled from 'styled-components'
import {useState, useEffect} from 'react'

let ButtonWrapper = styled.div`
        >.icon-wrapper{ 
            position: relative;
            display: inline-block;
            width: 30px;
            height: 30px;
            padding: 8px;
            border-radius: 10px;
            background: rgb(195, 229, 243);
            position: relative;
            margin: 5px 3px;
        }
        >.icon-wrapper>.indicator{
            position: absolute;
            left: -17px;
            top: 50%;
            transform: translateY(-50%);
            width: 15px;
            height: 3px;
            background: black;
        }
        >.icon-wrapper:hover{
            background: rgb(143, 218, 248);
        }
        .icon-img{
            position: relative;
            width: 100%;
            height: 100%;
        }
`


function ActionButton({changeAction, actionName, icon, activeAction}) {
    const [active, setActive] = useState(false)
    useEffect(() => {
        if(activeAction === actionName){
            setActive(true);
        }
        else    setActive(false);
    }, [activeAction, actionName])
    return (
        <ButtonWrapper>
            <div className='icon-wrapper' onClick={()=>{
                                            changeAction(actionName)
                                            }}>
                <div className = 'indicator'
                    style = {{display: active?'block':'none'}}></div>
                <img  className='icon-img' src={icon} alt="imagine" />
            </div>
        </ButtonWrapper>
    )
}

export default memo(ActionButton)
