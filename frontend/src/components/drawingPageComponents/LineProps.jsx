import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
function LineProps({linePropsObj,setLinePropsObj}) {

    const [strokeColor, setStrokeColor] = useState(linePropsObj.strokeColor);
    const [strokeWidth, setStrokeWidth] = useState(linePropsObj.strokeWidth);

    useEffect(() => {
        setLinePropsObj({strokeColor: strokeColor, strokeWidth: strokeWidth});
    }, [])
    useEffect(() => {
       setLinePropsObj({strokeColor: strokeColor, strokeWidth: strokeWidth});
    }, [strokeColor,strokeWidth])

    return (
        <>
            <div className = 'propItem' >
                <input type="color" defaultValue={strokeColor} onChange={(e)=>{setStrokeColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the color of the line
                </div>
            </div>
            <div className = 'propItem' >
                <input type="number" defaultValue={strokeWidth} onChange={(e)=>{if(e.target.value>=0) setStrokeWidth(parseInt(e.target.value))}}/>
                <div className = 'description'>
                    Set the width of the line
                </div>
            </div>
        </>
    )
}

export default LineProps
