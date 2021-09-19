import React, { useState } from 'react'
import { Redirect } from 'react-router';
import styled from 'styled-components'
import ErrorBox from '../loginRegisterComponents/ErrorBox';


let FocusWrapper = styled.div`
    z-index: 99;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #6d6c6c67;
`
let ModalWrapper = styled.div`
    position: absolute;
    width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: lightgray;
    padding: 0px 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px #000000b1;
    >label{
        margin-bottom: 5px;
    }
    >input{
        padding: 2px 5px;
        font-size: 105%;
        outline: none;
        border: none;
        box-sizing: border-box;
        border-radius: 5px;
        :focus{
            box-shadow: 0px 0px 5px 0px #000000b1;
        }
    }
    >.buttonWrapper{
        margin-left: auto;
        margin-top: 30px;
        >button{
            padding: 5px 10px;
            margin-left: 5px;
            border-radius: 5px;
            font-size: 15px;
            
        }
        >.createBtn{
            background: #3593e0;
            border: none;
            color: white;
            :active{
                background: #197fd3;
            }

        }
        >.cancelBtn{
            background: lightgray;
            border: none;
            :active{
                background: gray;
            }
        }
    }
`

export default function NewWhiteboardModal({modalOpened, setModalOpened}) {

    const [redirect, setRedirect] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [newWhiteboardName, setNewWhiteboardName] = useState('');
    
    const createNewWhiteboard = async ()=>{
        try {
            const response = await fetch(require('../../scripts/apiLocation')+'/api/addwhiteboard',{
                method: 'POST',
                mode: 'cors',
                headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
                body: JSON.stringify({whiteboard_name: newWhiteboardName})
            })
            const parsedResponse = await response.json();
            if(response.ok){
                setRedirect(parsedResponse.whiteboard_id);
            }
            else{
                console.log(response.statusText)
                setErrorMsg(parsedResponse)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FocusWrapper style={{display: modalOpened?'block':'none'}}
                        onClick = {()=>{setModalOpened(false)}}>
            <ModalWrapper onClick = {(e)=>{e.stopPropagation()}}>
                <h2>New Whiteboard</h2>
                <label htmlFor="whiteboardName">Whiteboard title</label>
                <input type="text" id='whiteboardName' onChange = {(e)=>{setNewWhiteboardName(e.target.value);}} />
                <ErrorBox errMsg={errorMsg} style={{marginTop: '30px'}}/>
                <div className='buttonWrapper'>
                    <button className='createBtn' onClick={createNewWhiteboard}>Create</button>
                    <button className='cancelBtn' onClick = {()=>{setModalOpened(false)}}>Cancel</button>
                </div>
                {redirect?<Redirect to={'/drawingPage/'+redirect}/>:''}
            </ModalWrapper>
        </FocusWrapper>
    )
}
