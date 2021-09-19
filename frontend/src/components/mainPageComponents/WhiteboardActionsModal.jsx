import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import threeDotsIcon from '../../Icons/threeDots.svg'
import RenameWhiteboardModal from './RenameWhiteboardModal'


const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
    width: 15px;
    padding: 0 15px;
    .activatorBtn{
        position: relative;
        display: inline-block;
        width: 100%;
        cursor: pointer;
        >img{
            width: 100%;
        }
    }
    .contentWrapper{
        position: absolute;
        width: 200px;
        top: -5px;
        left: 70%;
        transform: translate(-100%,-100%);
        padding: 5px 10px;
        border-radius: 10px;
        background: ghostwhite;
        box-shadow: 5px 5px 15px -5px #000000;
        >*{
            margin: 5px 0;
            :hover{
                color: #97d2e5;
                cursor: pointer;
            }
        }
    }
`

export default function WhiteboardActionsModal({wid}) {

    const [actionBoxModalOpened, setActionBoxModalOpened] = useState(false)
    const [renameModalOpened, setRenameModalOpened] = useState(false)

    useEffect(()=>{
        function closeModalWindowEvent(e){
            setActionBoxModalOpened(false);
        }
        if(actionBoxModalOpened){
            window.addEventListener('click', closeModalWindowEvent);
        }
        else{
            window.removeEventListener('click',closeModalWindowEvent);
        }
        return function cleanup(){
            window.removeEventListener('click',closeModalWindowEvent);
        }
    },[actionBoxModalOpened])



    const DeleteWhiteboard = async ()=>{
        let confirmation = window.confirm('Are you sure you want to delete the witeboard?')
        if(confirmation)
        try {
            const response = await fetch(require('../../scripts/apiLocation')+`/api/deletewhiteboard/${wid}`,{
                method: 'POST',
                mode: 'cors',
                headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
            })
            const parsedResponse = await response.json();
            if(response.ok){
                console.log(parsedResponse);
                window.location.reload();
            }
            else{
                console.log(response.statusText)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <Wrapper>
            <div className = 'activatorBtn' onClick={(e)=>{setActionBoxModalOpened(!actionBoxModalOpened);}}>
                <img src={threeDotsIcon} alt="actions menu opener" />
            </div>

            {actionBoxModalOpened?<div className = 'contentWrapper' onClick={(e)=>{e.stopPropagation();}}>
                <div onClick = {DeleteWhiteboard}>Delete</div>
                <div onClick = {()=>setRenameModalOpened(true)}>Rename</div>
            </div>:''}
            
        </Wrapper>
        {renameModalOpened?<RenameWhiteboardModal modalOpened={renameModalOpened} setModalOpened={setRenameModalOpened} wid={wid}/>:''}
        </>
    )
}
