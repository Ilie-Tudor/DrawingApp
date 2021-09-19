import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import TriggerButton from './TriggerButton'


const Wrapper = styled.div`
    position: fixed;
    bottom: 2%;
    left: 1%;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: whitesmoke;
    
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

export default function SelectionPropsWrapper({ selectedObj, selectedObjProperties, setSelectedObjProperties }) {

    const [type, setType] = useState('nimica');
    const [tempPropsObj,setTempPropsObj] = useState({});
    const [bold,setBold] = useState(false);
    const [underline,setUnderline] = useState(false);
    const [italic,setItalic] = useState(false);

    useEffect(() => {
        setTempPropsObj({...tempPropsObj,fontWeight:bold?'bold':''});
    }, [bold])
    useEffect(() => {
        setTempPropsObj({...tempPropsObj,underline:underline?true:false});
    }, [underline])
    useEffect(() => {
        setTempPropsObj({...tempPropsObj,fontStyle:italic?'italic':'normal'});
    }, [italic])
    

    let PropPick = (type) => {
        switch (type) {
                case 'rect':
                case 'circle':
                case 'ellipse':
                case 'triangle':
                return (
                    <>
                        <div className='propItem'  >
                            <input type="color" value={tempPropsObj.fill} onChange = {(e)=>{setTempPropsObj({...tempPropsObj, fill: e.target.value})}}/>
                            <div className='description'>
                                Set the fill color of the shape
                            </div>
                        </div>
                        <div className='propItem' >
                            <input type="color" value={tempPropsObj.stroke} onChange = {(e)=>{setTempPropsObj({...tempPropsObj, stroke: e.target.value})}}/>
                            <div className='description'>
                                Set the color of the border
                            </div>
                        </div>
                        <div className='propItem' >
                            <input type="number" value={tempPropsObj.strokeWidth} onChange = {(e)=>{
                                if(e.target.value!='' && parseInt(e.target.value)>=0)
                                    setTempPropsObj({...tempPropsObj,strokeWidth:parseInt(e.target.value)})
                                else
                                    setTempPropsObj({...tempPropsObj,strokeWidth:0})
                                }}/>
                            <div className='description'>
                                Set the width of the border
                            </div>
                        </div>
                    </>
                )
                case 'line':
                case 'path':
                    return (
                        <>
                            <div className='propItem' >
                                <input type="color" value={tempPropsObj.stroke} onChange = {(e)=>{setTempPropsObj({...tempPropsObj, stroke: e.target.value})}}/>
                                <div className='description'>
                                    Set the color 
                                </div>
                            </div>
                            <div className='propItem' >
                                <input type="number" value={tempPropsObj.strokeWidth} onChange = {(e)=>{
                                    if(e.target.value!='' && parseInt(e.target.value)>=0)
                                        setTempPropsObj({...tempPropsObj,strokeWidth:parseInt(e.target.value)})
                                    else
                                        setTempPropsObj({...tempPropsObj,strokeWidth:0})
                                    }}/>
                                <div className='description'>
                                    Set the width 
                                </div>
                            </div>
                        </>
                    )
                case 'polyline':
                    return (
                        <>
                            <div className='propItem'  >
                                <input type="color" value={tempPropsObj.fill} onChange = {(e)=>{setTempPropsObj({...tempPropsObj, fill: e.target.value})}}/>
                                <div className='description'>
                                    Set the fill color
                                </div>
                            </div>
                            <div className='propItem' >
                                <input type="color" value={tempPropsObj.stroke} onChange = {(e)=>{setTempPropsObj({...tempPropsObj, stroke: e.target.value})}}/>
                                <div className='description'>
                                    Set the color of the border
                                </div>
                            </div>
                        </>
                    )
                case 'textbox':
                    return (
                        <>
                            <div className = 'propItem' >
                                <input type="color" value={tempPropsObj.fill} onChange={(e)=>{setTempPropsObj({...tempPropsObj,fill: e.target.value})}}/>
                                <div className = 'description'>
                                    Set the text color
                                </div>
                            </div>
                
                            <div className = 'propItem' >
                                <input type="number" value={tempPropsObj.fontSize} min={1} onChange={(e)=>{if(e.target.value>=0) setTempPropsObj({...tempPropsObj, fontSize: parseInt(e.target.value)})}}/>
                                <div className = 'description'>
                                    Set the font size
                                </div>
                            </div>
                
                            <div className = 'propItem' >
                                <TriggerButton state = {bold} changeState={setBold} insideComponent={<div>B</div>} onColor = {'gray'} offColor={'lightgray'}/>
                                <div className = 'description'>
                                    Bold
                                </div>
                            </div>
                            <div className = 'propItem' >
                                <TriggerButton state = {underline} changeState={setUnderline} insideComponent={<div>U</div>} onColor = {'gray'} offColor={'lightgray'}/>
                                <div className = 'description'>
                                    Underline
                                </div>
                            </div>
                            <div className = 'propItem' >
                                <TriggerButton state = {italic} changeState={setItalic} insideComponent={<div>I</div>} onColor = {'gray'} offColor={'lightgray'}/>
                                <div className = 'description'>
                                    Italic
                                </div>
                            </div>
                        </>
                    )
            default:
                return <div></div>
        }
    }
    useEffect(() => {
        setType(selectedObj.type);
        setSelectedObjProperties({});
        let {fill,stroke,strokeWidth,fontSize,fontWeight,underline,fontStyle} = selectedObj;
        setTempPropsObj({fill,stroke,strokeWidth,fontSize,fontWeight,underline,fontStyle})
        if(fontWeight == 'bold')    setBold(true);
        else setBold(false);
        if(underline == true)    setUnderline(true);
        else setUnderline(false);
        if(fontStyle == 'italic')    setItalic(true);
        else if(fontStyle == 'normal') setItalic(false);
    }, [selectedObj])
    useEffect(() => {
        setSelectedObjProperties(tempPropsObj);
    }, [tempPropsObj])
    return (
        <Wrapper >
            {PropPick(type)}
        </Wrapper>
    )
}
