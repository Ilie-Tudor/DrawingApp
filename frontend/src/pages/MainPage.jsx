import React,{useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoggedInContent from '../components/mainPageComponents/LoggedInContent.jsx'
import LoggedOutContent from '../components/mainPageComponents/LoggedOutContent.jsx'


const Wrapper = styled.div`
    background: ghostwhite;
`



export default function MainPage() {

    const [whiteboards, setWhiteboards] = useState("")

    useEffect(() => {
        (async ()=>{
            try {
                const response = await fetch(require('../scripts/apiLocation')+'/api/getwhiteboards',{
                    method: 'GET',
                    mode: 'cors',
                    headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
                })
                const parsedResponse = await response.json();
                if(response.ok){
                    setWhiteboards(parsedResponse);
                }
                else{
                    console.log(response.statusText)
                    setWhiteboards('');
                }
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])


    return (
        <Wrapper>
        <Navbar></Navbar>
        {whiteboards?<LoggedInContent whiteboards = {whiteboards}/>:<LoggedOutContent/>}
        <Footer></Footer>
        </Wrapper>
    )
}
