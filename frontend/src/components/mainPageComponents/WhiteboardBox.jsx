import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { fabric } from 'fabric'
import styled from 'styled-components'
import WhiteboardActionsModal from './WhiteboardActionsModal'

import pencilRulerIcon from '../../Icons/pencil-ruler-solid.svg'


let Wrapper = styled.div`
    position: relative;
    display: inline-block;
    
    width: 300px;
    .boardPrev{
        position: relative;
        display: block;
        width: 100%;
        height: 300px;
        background: rgba(187, 149, 248, 0.7);
        overflow: hidden;
        cursor: pointer;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        >img{
            position: absolute;
            width: 30%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        :hover{
            background: rgba(187, 149, 248, 1);


        }
    }
    .infoWrapper{
        position: relative;
        padding: 0px 15px;
        padding-right: 30px;
        background: lightgray;
        border-top: 1px solid black;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        .boardTitle, .boardDate{
            position: relative;
        }
        .boardTitle{
            padding-top: 5px;
            font-size: 130%;
        }
        .boardDate{
            padding-bottom: 5px;
        }
        .actionsBtn{
            position: absolute;
            top: 50%;
            right: 10px;
            display: inline-block;
            width: 15px;
            transform: translateY(-50%);
            cursor: pointer;
            >img{
                position: relative;
                width: 100%;
            }
        }
    }
`


export default function WhiteboardBox({id,title,date,content}) {

    return (
        <Wrapper className = 'whiteboardBoxWrapper'>
            <Link to={'drawingPage/'+id} className = 'boardPrev'>
                <img src={pencilRulerIcon} alt="pencil icon" />
            </Link>
            <div className = 'infoWrapper'>
                <div className = 'boardTitle'>{title}</div>
                <div className = 'boardDate'>created at: {date.slice(0,10)}</div>
                <WhiteboardActionsModal wid = {id}/>
                {/* <div className = 'actionsBtn'> */}
                    {/* <img src={threeDotsIcon} alt="submenu icon" /> */}
                    {/* aici trebuie facut un modal intreg care sa fie activat de 3 pcte */}
                {/* </div> */}
            </div>
        </Wrapper>
    )
}
