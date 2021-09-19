import React from 'react'
import { useState, useEffect } from 'react'
function PenProps({penPropsObj,setPenPropsObj}) {

    const [color, setColor] = useState(penPropsObj.color);
    const [width, setWidth] = useState(penPropsObj.width);

    useEffect(() => {
        setPenPropsObj({color: color,width: width});
    }, [])
    useEffect(() => {
       setPenPropsObj({color: color,width: width});
    }, [color,width])

    return (
        <>
            <div className = 'propItem' >
                <input type="color" defaultValue={color} onChange={(e)=>{setColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the color of the brush
                </div>
            </div>
            <div className = 'propItem' >
                <input type="number" defaultValue={width} min="1" max="80"onChange={(e)=>{if(e.target.value  )setWidth(parseInt(e.target.value))}}/>
                <div className = 'description'>
                    Set the width of the brush
                </div>
            </div>
        </>
    )
}

export default PenProps
