import React, { memo } from 'react'
import {useEffect, useState, useRef} from 'react'
import { useParams } from "react-router-dom";
import { fabric } from 'fabric'
import { actionVector, initAction } from '../../scripts/actionVector'


function Canvas({activeAction, changeAction, properties, saveActivator, setSelectedObj, selectedObjProperties}) {

    
    const {wid} = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    let action = useRef();
    let canvas = useRef();
    function ExportFromCanvas(canvas) {
        return JSON.stringify(canvas);
    }
    function ImportInCanvas(canvas, str) {
        canvas.loadFromJSON(str);
    }
    let LoadContent = async (canvas)=>{
        
        try {
            const response = await fetch(require('../../scripts/apiLocation')+`/api/getwhiteboard/${wid}`,{
                method: 'GET',
                mode: 'cors',
                headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
            })
            const parsedResponse = await response.json();
            if(response.ok){
                setIsLoaded(true)
                ImportInCanvas(canvas.current,parsedResponse.whiteboard_content);
            }
            else{
                console.log(response.statusText)
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
        }
    }
    let SaveContent = async (canvas)=>{
            try {
                const response = await fetch(require('../../scripts/apiLocation')+`/api/savewhiteboard/${wid}`,{
                    method: 'PUT',
                    mode: 'cors',
                    headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
                    body: JSON.stringify({"content": ExportFromCanvas(canvas.current)})
                })
                const parsedResponse = await response.json();
                if(response.ok){
                    
                }
                else{
                    console.log(response.statusText)
                }
            } catch (error) {
                console.error(error);
            }
    }
    
    useEffect(() => {
    canvas.current = new fabric.Canvas('canvas',{
        height: window.innerHeight-80,
        width: window.innerWidth,
        fireRightClick: true,  // <-- enable firing of right click events
        fireMiddleClick: true,
        backgroundColor: "lightgrey",
    });
    const SelectionHandler = (e)=>{
        e.target.set({
            borderColor: 'black',
            cornerColor: 'black',
            cornerSize: 7,
            transparentCorners: false 
        })
        
        setSelectedObj(e.target);
    }
    const DeselectionHandler = (e)=>{
        setSelectedObj({type: 'nothingselected'});
    }
    const ResizeHandler = ()=>{
        canvas.current.setHeight(window.innerHeight-80);
        canvas.current.setWidth(window.innerWidth);
    }
    const KeyEventHandler = (e)=>{
        // if(e.key =='a'){
        //     changeAction('square');
        // }
        // else if(e.key =='s'){
        //     SaveContent(canvas);
        // }
        // else if(e.key == 'q'){
        //     changeAction('pen');
        // }
        // else if(e.key == 'p'){
        //     changeAction('navigation')
        // }
        // else if(e.key == 'l'){
        //     changeAction('line');
        // }
        // else if (e.key == "b") {
        //     changeAction("circle");
        // }
        // else if (e.key == "t") {
        //     changeAction("triangle");
        // }
        // else if(e.key == '0'){
        //     changeAction("ellipse");
        // }
        // else if(e.key == '1'){
        //     changeAction("textbox");
        // }
        // else if(e.key == '2'){
        //     changeAction("eraser");
        // }
        // else if(e.key == '3'){
        //     changeAction("arrow");
        // }
        if(e.key =='Delete'){
            canvas.current.remove(canvas.current.getActiveObject());
        }
    }
    
    LoadContent(canvas);
    canvas.current.on('selection:created', SelectionHandler)
    canvas.current.on('selection:updated', SelectionHandler)
    canvas.current.on('selection:cleared', DeselectionHandler)
    window.addEventListener('resize', ResizeHandler)

    let appliedActionVector = [];
    for(let i = 0;i<actionVector.length;i++){
        let tuple = actionVector[i].handler(canvas.current);
        appliedActionVector.push({
            type: actionVector[i].type,
            func: tuple[0],
            exitFunc: tuple[1],
            setProps: tuple[2]
        })
    }
    action.current = initAction(canvas.current, appliedActionVector);

    action.current.setAction("pen");
    
    window.addEventListener('keydown',KeyEventHandler);
    canvas.current.renderAll();

    return function cleanup(){
        canvas.current.off('selection:created', SelectionHandler)
        canvas.current.off('selection:updated', SelectionHandler)
        canvas.current.off('selection:cleared', DeselectionHandler)
        window.removeEventListener('resize', ResizeHandler)
        window.removeEventListener('keydown',KeyEventHandler);
    }
    
    }, [])

    useEffect(() => {
        action.current.setAction(activeAction)
        action.current.setProperties(properties)
    }, [activeAction])
    useEffect(() => {
        action.current.setProperties(properties)
    }, [properties])
    useEffect(() => {
        if(isLoaded)
        SaveContent(canvas);
    }, [saveActivator])
    useEffect(() => {
        if(canvas.current.getActiveObject() != undefined){
            
            if(selectedObjProperties.fill != undefined){
                canvas.current.getActiveObject().set({fill: selectedObjProperties.fill});
            }
           
            if(selectedObjProperties.stroke != undefined){
                canvas.current.getActiveObject().set({stroke: selectedObjProperties.stroke});
            }
            
            if(selectedObjProperties.strokeWidth != undefined){
                canvas.current.getActiveObject().set({strokeWidth: selectedObjProperties.strokeWidth});
            }
            if(selectedObjProperties.fontSize != undefined){
                canvas.current.getActiveObject().set({fontSize: selectedObjProperties.fontSize});
            }
            if(selectedObjProperties.fontWeight != undefined){
                canvas.current.getActiveObject().set({fontWeight: selectedObjProperties.fontWeight});
            }
            if(selectedObjProperties.fontStyle != undefined){
                canvas.current.getActiveObject().set({fontStyle: selectedObjProperties.fontStyle});
            }
            if(selectedObjProperties.underline != undefined){
                canvas.current.getActiveObject().set({underline: selectedObjProperties.underline});
            }
            
            canvas.current.renderAll();
            
        }
    }, [selectedObjProperties])



    return (
        <div style = {{overflow: 'hidden'}}>
            <canvas id = 'canvas'  className='canvas'></canvas> 
        </div>
    )
}

export default memo(Canvas)
