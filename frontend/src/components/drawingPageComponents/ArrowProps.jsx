import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
function ArrowProps({arrowPropsObj,setArrowPropsObj}) {

    const [fillColor, setFillColor] = useState(arrowPropsObj.fillColor);
    const [strokeColor, setStrokeColor] = useState(arrowPropsObj.strokeColor);

    useEffect(() => {
        setArrowPropsObj({fillColor: fillColor, strokeColor: strokeColor});
    }, [])
    useEffect(() => {
       setArrowPropsObj({fillColor: fillColor, strokeColor: strokeColor});
    }, [fillColor,strokeColor])

    return (
        <>
            <div className = 'propItem' >
                <input type="color" defaultValue={fillColor} onChange={(e)=>{setFillColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the fill color of the arrow
                </div>
            </div>
            <div className = 'propItem' >
                <input type="color" defaultValue={strokeColor} onChange={(e)=>{setStrokeColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the color of the border
                </div>
            </div>
        </>
    )
}

export default ArrowProps
