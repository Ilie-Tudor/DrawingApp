import React, { memo } from 'react'
import { useState, useEffect} from 'react'
import styled from 'styled-components'
import PenProps from './PenProps'
import SquareProps from './SquareProps'
import CircleProps from './CircleProps'
import LineProps from './LineProps'
import ArrowProps from './ArrowProps'
import TriangleProps from './TriangleProps'
import EllipseProps from './EllipseProps'
import TextboxProps from './TextboxProps'

let StyleWrapper = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    left: 1%;
    bottom: 2%;
    background: whitesmoke;
    
    z-index: 98;
    border-radius: 10px;
    box-shadow: 2px 5px 10px 2px rgba(0,0,0,.8);
    >.propItem{
        position: relative;
        display: flex;
        max-width: 50px;
        margin: 5px 10px;
        >input{
            display: inline-block;
            box-sizing: border-box;
        }
        >*{
            position: relative;
            max-width: 100%;
        }
        >.description{
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translate(-50%,-100%);
            background: black;
            color: ghostwhite;
            border-radius: 5px;
            width: 100px;
            max-width: none;
            padding: 2px;
            text-align: center;
            display: none;
        }
        :hover{
            >.description{
                display: block;
            }
        }
    }

`

function PropsWrapper({activeAction, changeProperties}) {
    const [penPropsObj, setPenPropsObj] = useState({color: '#000000', width: 3});
    const [squarePropsObj, setSquarePropsObj] = useState({fillColor: '#000000', strokeColor: '#8d3e3e', strokeWidth: 3});
    const [circlePropsObj, setCirclePropsObj] = useState({fillColor: '#000000', strokeColor: '#8d3e3e', strokeWidth: 0});
    const [linePropsObj, setLinePropsObj] = useState({strokeColor: '#000000', strokeWidth: 1});
    const [arrowPropsObj, setArrowPropsObj] = useState({fillColor: '#000000', strokeColor: '#8d3e3e'});
    const [trianglePropsObj, setTrianglePropsObj] = useState({fillColor: '#000000', strokeColor: '#8d3e3e', strokeWidth: 0});
    const [ellipsePropsObj, setEllipsePropsObj] = useState({fillColor: '#000000', strokeColor: '#8d3e3e', strokeWidth: 0});
    const [textboxPropsObj, setTextboxPropsObj] = useState({textColor: '#000000', fontSize: '15', bold: false, italic: false, underline: false});


    useEffect(() => {
        changeProperties(penPropsObj);
    }, [penPropsObj])
    useEffect(() => {
        changeProperties(squarePropsObj);
    }, [squarePropsObj])
    useEffect(() => {
        changeProperties(circlePropsObj);
    }, [circlePropsObj])
    useEffect(() => {
        changeProperties(linePropsObj);
    }, [linePropsObj])
    useEffect(() => {
        changeProperties(arrowPropsObj);
    }, [arrowPropsObj])
    useEffect(() => {
        changeProperties(trianglePropsObj);
    }, [trianglePropsObj])
    useEffect(() => {
        changeProperties(ellipsePropsObj);
    }, [ellipsePropsObj])
    useEffect(() => {
        changeProperties(textboxPropsObj);
    }, [textboxPropsObj])

    let PropPick = (action)=>{
        switch (action) {
            case 'pen':
                return <PenProps key = 'penProps' penPropsObj = {penPropsObj} setPenPropsObj = {setPenPropsObj}/>
            case 'square':
                return <SquareProps key = 'squareProps' squarePropsObj = {squarePropsObj} setSquarePropsObj = {setSquarePropsObj}/>
            case 'circle':
                return <CircleProps key = 'circleProps' circlePropsObj = {circlePropsObj} setCirclePropsObj = {setCirclePropsObj}/>
            case 'line':
                return <LineProps key = 'lineProps' linePropsObj = {linePropsObj} setLinePropsObj = {setLinePropsObj}/>
            case 'arrow':
                return <ArrowProps key = 'arrowProps' arrowPropsObj = {arrowPropsObj} setArrowPropsObj = {setArrowPropsObj}/>
            case 'triangle':
                return <TriangleProps key = 'triangleProps' trianglePropsObj = {trianglePropsObj} setTrianglePropsObj = {setTrianglePropsObj}/>
            case 'ellipse':
                return <EllipseProps key = 'ellipseProps' ellipsePropsObj = {ellipsePropsObj} setEllipsePropsObj = {setEllipsePropsObj}/>
            case 'textbox':
                return <TextboxProps key = 'textboxProps' textboxPropsObj = {textboxPropsObj} setTextboxPropsObj = {setTextboxPropsObj}/>
            default:
                return <div></div>
        }
    }
    
    return (
        <StyleWrapper>
            {PropPick(activeAction)}
        </StyleWrapper>
    )
}

export default memo(PropsWrapper)
