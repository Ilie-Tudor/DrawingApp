import React, { memo, useRef } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Canvas from '../components/drawingPageComponents/Canvas'
import ActionButton from '../components/drawingPageComponents/ActionButton'
import PropsWrapper from '../components/drawingPageComponents/PropsWrapper'
import SelectionPropsWrapper from '../components/drawingPageComponents/SelectionPropsWrapper'

import penIcon from '../Icons/pen.svg'
import navigationIcon from '../Icons/navigation.svg'
import squareIcon from '../Icons/square.svg'
import circleIcon from '../Icons/circle.svg'
import ellipseIcon from '../Icons/elipse.svg'
import triangleIcon from '../Icons/triangle.svg'
import lineIcon from '../Icons/straight-line.svg'
import rightChevron from '../Icons/right-chevron.svg'
import textIcon from '../Icons/text.svg'
import eraserIcon from '../Icons/eraser.svg'
import arrowIcon from '../Icons/arrow.svg'
import SaveButton from '../components/drawingPageComponents/SaveButton'



const ActionBtnWrapper = styled.div`
    position: fixed;
    left: 1%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
    background: whitesmoke;
    padding: 10px 5px;
    border-radius: 10px;
    box-shadow: 2px 5px 10px 2px rgba(0,0,0,.8);
    
`

const ShapesWrapperComponent = memo(({ className, children, activeAction, changeAction})=>{
    return(
        <div className={className}>
            {children}
        </div>
    )
})

const ShapesWrapper = styled(ShapesWrapperComponent)`
    position: relative;
    >.invisibleShapes{
        position: absolute;
        top: 0;
        left: 160%;
        width: auto; // aici de vazut ce valoare pun
        height: auto;
        display: flex;
        flex-wrap: wrap;
        background: whitesmoke;
        border-radius: 10px;
        padding: 0px 5px;
        box-shadow: 2px 5px 10px 2px rgba(0,0,0,.8);
    }
    >.shapesRevealer{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 110%;
        width: 20px;
        height: auto;
        background: whitesmoke;
        display: flex;
        align-items: center;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-left: 2px solid black;
        :hover{
            background: #818080;
        }
        >img{
            width: 100%;
            padding: 10px 0;
            
        }
    }
`
const Wrapper = styled.div`

`

function DrawingPage() {

    const [action, setAction] = useState('pen');
    const [properties, setProperties] = useState('');
    const [shapesModalState, setShapesModalState] = useState(false);
    const [saveActivator, setSaveActivator] = useState(false);
    const lastActiveShape = useRef('square');
    const [selectedObj, setSelectedObj] = useState({})
    const [selectedObjProperties, setSelectedObjProperties] = useState({})


    function ModalStateHandler(){
        if(shapesModalState === true)    setShapesModalState(false);
        else    setShapesModalState(true);
    }
    function changeAction(name){
        setAction(name);
    }
    function changeProperties(propObj) {
        setProperties(propObj);
    }
    
    let ShapesArray = [
        {actionName: 'square', icon: squareIcon},
        {actionName: 'circle', icon: circleIcon},
        {actionName: 'ellipse', icon: ellipseIcon},
        {actionName: 'triangle', icon: triangleIcon},
    ]

    function SearchShape( exclusive = false) {
        if(!exclusive){
            if(ShapesArray.filter(shape=>shape.actionName == action).length!=0)
            {
                lastActiveShape.current = action;
                return ShapesArray.filter(shape=>shape.actionName == action)
            }
            else 
                return ShapesArray.filter(shape=>shape.actionName == lastActiveShape.current)
        }
        else{
            if(ShapesArray.filter(shape=>shape.actionName == action).length!=0)
                return ShapesArray.filter(shape=>shape.actionName != action)
            else 
                return ShapesArray.filter(shape=>shape.actionName != lastActiveShape.current)
        }
    }

   
    return (
        <Wrapper>
            <Navbar></Navbar>
            <ActionBtnWrapper>
                <SaveButton saveActivator = {saveActivator} setSaveActivator={setSaveActivator}/>
                <ActionButton activeAction = {action} changeAction = {changeAction} actionName = {'navigation'} icon = {navigationIcon}></ActionButton>
                <ActionButton activeAction = {action} changeAction = {changeAction} actionName = {'pen'} icon = {penIcon}></ActionButton>
                <ActionButton activeAction = {action} changeAction = {changeAction} actionName = {'line'} icon = {lineIcon}></ActionButton>
                <ActionButton activeAction = {action} changeAction = {changeAction} actionName = {'arrow'} icon = {arrowIcon}></ActionButton>
                <ShapesWrapper>
                    {
                        SearchShape().map((shape)=>
                        <ActionButton key = {shape.actionName} activeAction = {action} changeAction = {changeAction} actionName = {shape.actionName} icon = {shape.icon}></ActionButton>)
                    }
                    <div className='shapesRevealer' onClick = {()=>{ModalStateHandler()}}>
                        <img src={rightChevron} alt="right chevron" />
                    </div>
                    <div className='invisibleShapes'
                        style = {{display: shapesModalState?'block':'none'}}
                        onClick = {()=>{ModalStateHandler()}}>
                        {
                            SearchShape(true).map((shape)=>
                            <ActionButton key = {shape.actionName} activeAction = {action} changeAction = {changeAction} actionName = {shape.actionName} icon = {shape.icon}></ActionButton>)
                        }
                    </div>
                </ShapesWrapper>
                <ActionButton activeAction = {action} changeAction = {changeAction} actionName = {'textbox'} icon = {textIcon}></ActionButton>
                <ActionButton activeAction = {action} changeAction = {changeAction} actionName = {'eraser'} icon = {eraserIcon}></ActionButton>
            </ActionBtnWrapper>
            <SelectionPropsWrapper 
                selectedObj = {selectedObj}
                selectedObjProperties = {selectedObjProperties}
                setSelectedObjProperties = {setSelectedObjProperties}
                />
            <PropsWrapper activeAction = {action} changeProperties = {changeProperties}/>
            <Canvas  
                setSelectedObj = {setSelectedObj} 
                selectedObjProperties = {selectedObjProperties}
                activeAction = {action} 
                changeAction = {changeAction} 
                properties={properties}
                saveActivator = {saveActivator}
            ></Canvas>
        </Wrapper>
    )
}

export default DrawingPage
