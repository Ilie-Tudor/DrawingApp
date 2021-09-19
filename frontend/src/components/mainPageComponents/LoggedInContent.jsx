import React,{useState} from 'react'
import styled from 'styled-components'
import NewWhiteboardModal from './NewWhiteboardModal'
import WhiteboardBox from './WhiteboardBox'


let Wrapper = styled.div`
    margin-bottom: 250px;
    h1{
        margin-top: 50px;
        margin-left: 10px;
    }

`

let BoardsWrapper = styled.div`
    position: relative;
    padding: 0 10px;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    .whiteboardBoxWrapper{
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .addWhiteboardBtn{
        position: relative;
        width: 300px;
        height: 300px;
        background: lightgray;
        display: inline-block;
        border-radius: 20px;
        cursor: pointer;
        :hover{
            background: grey;
        }
        >div{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 300%;
        }
    }
`

export default function LoggedInContent({whiteboards}) {

    const [modalOpened, setModalOpened] = useState(false);
    return (
        <Wrapper>
            <h1>Your boards</h1>
            <BoardsWrapper>
                {whiteboards.map((whiteboard)=>
                    <WhiteboardBox key={whiteboard.whiteboard_id} id={whiteboard.whiteboard_id} title={whiteboard.whiteboard_name} date = {whiteboard.creation_date} content = {whiteboard.whiteboard_content}></WhiteboardBox>
                )}
                
                <div className = 'addWhiteboardBtn' onClick={()=>{setModalOpened(true)}}
                        style={{opacity: modalOpened?'0':'1'}}>
                        <div>+</div>
                        </div>
            </BoardsWrapper>
            <NewWhiteboardModal modalOpened = {modalOpened} setModalOpened={setModalOpened}></NewWhiteboardModal>
        </Wrapper>
    )
}
