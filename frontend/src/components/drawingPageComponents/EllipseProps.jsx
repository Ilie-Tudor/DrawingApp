import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
function EllipseProps({ellipsePropsObj,setEllipsePropsObj}) {

    const [fillColor, setFillColor] = useState(ellipsePropsObj.fillColor);
    const [strokeColor, setStrokeColor] = useState(ellipsePropsObj.strokeColor);
    const [strokeWidth, setStrokeWidth] = useState(ellipsePropsObj.strokeWidth);

    useEffect(() => {
        setEllipsePropsObj({fillColor: fillColor, strokeColor: strokeColor, strokeWidth: strokeWidth});
    }, [])
    useEffect(() => {
       setEllipsePropsObj({fillColor: fillColor, strokeColor: strokeColor, strokeWidth: strokeWidth});
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

export default EllipseProps
