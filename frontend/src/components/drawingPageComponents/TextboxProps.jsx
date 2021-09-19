import React from 'react'
import { useState, useEffect } from 'react'
import TriggerButton from './TriggerButton';
function TextboxProps({textboxPropsObj,setTextboxPropsObj}) {

    const [textColor, setTextColor] = useState(textboxPropsObj.textColor);
    const [fontSize, setFontSize] = useState(textboxPropsObj.fontSize);
    const [bold, setBold] = useState(textboxPropsObj.bold);
    const [italic, setItalic] = useState(textboxPropsObj.italic);
    const [underline, setUnderline] = useState(textboxPropsObj.underline);

    useEffect(() => {
        setTextboxPropsObj({textColor: textColor, fontSize: fontSize, bold: bold, italic: italic, underline: underline});
    }, [])
    useEffect(() => {
       setTextboxPropsObj({textColor: textColor, fontSize: fontSize, bold: bold, italic: italic, underline: underline});
    }, [textColor, fontSize, bold, italic, underline])

    return (
        <>
            <div className = 'propItem' >
                <input type="color" defaultValue={textColor} onChange={(e)=>{setTextColor(e.target.value)}}/>
                <div className = 'description'>
                    Set the text color
                </div>
            </div>

            <div className = 'propItem' >
                <input type="number" defaultValue={fontSize} min={1} onChange={(e)=>{if(e.target.value>=0) setFontSize(parseInt(e.target.value))}}/>
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
}

export default TextboxProps
