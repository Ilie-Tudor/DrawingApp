import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
function SquareProps({squarePropsObj,setSquarePropsObj}) {

    const [fillColor, setFillColor] = useState(squarePropsObj.fillColor);
    const [strokeColor, setStrokeColor] = useState(squarePropsObj.strokeColor);
    const [strokeWidth, setStrokeWidth] = useState(squarePropsObj.strokeWidth);

    useEffect(() => {
        setSquarePropsObj({fillColor: fillColor, strokeColor: strokeColor, strokeWidth: strokeWidth});
    }, [])
    useEffect(() => {
       setSquarePropsObj({fillColor: fillColor, strokeColor: strokeColor, strokeWidth: strokeWidth});
    }, [fillColor,strokeColor,strokeWidth])

    return (
        <>
            <div className = 'propItem' >
                <input type="color" defaultValue={fillColor} onChange={(e)=>{setFillColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the fill color of the shape
                </div>
            </div>
            <div className = 'propItem' >
                <input type="color" defaultValue={strokeColor} onChange={(e)=>{setStrokeColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the color of the border
                </div>
            </div>
            <div className = 'propItem' >
                <input type="number" defaultValue={strokeWidth} onChange={(e)=>{if(e.target.value>=0) setStrokeWidth(parseInt(e.target.value))}}/>
                <div className = 'description'>
                    Set the width of the border
                </div>
            </div>
        </>
    )
}

export default SquareProps
