import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../components/loginRegisterComponents/LoginForm.jsx';
import RegisterForm from '../components/loginRegisterComponents/RegisterForm.jsx';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wrapper = styled.div`
    background: ghostwhite;
`
let SelectorWrapper=styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 5px;
    width: 300px;
    #login{
        width: 146px;
    }
    #register{
        width: 146px;
    }
    >button{
        position: relative;
        padding: 5px 10px;
        border: none;
        border-radius: 20px;
        background: #dfdddd;
    }
`
let FormsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
    padding: 20px 10px 50px 10px;
    margin: auto;
    margin-bottom: 300px;
    border: 2px solid #242222;
    border-radius: 20px;
    background: white;
    .form-inner{
        position: relative;
        
        .form-group{
            font-size: 110%;
            margin: 15px 0;
            position: relative;
            display: flex;
            flex-direction: column;
            >label{
                margin-bottom: 5px;
            }
            >input{
                border-radius: 10px;
                padding: 3px 10px;
                border: 1px solid #242222;
                outline: none;
            }
        }
        .formBtn{
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            padding: 10px 15px;
            border-radius: 5px;
            border: none;
            background: #3593e0;
            color: white;
            margin-top: 20px;
            cursor: pointer;
            :hover{
                background: #197fd3;
            }
        }
        .visiblePassGroup{
            bottom: 10px;
            flex-direction: row;
            margin-top: 0%;
            font-size: 100%;
            >input{
                position: relative;
                top: 2px;
            }
        }
    }
`
function LoginRegisterPage() {
    const [redirect, setRedirect]=useState(false);
    const [ActiveComponents, setActiveComponent]=useState("login")

    function Handler(name)
    {
        setActiveComponent(name);
    }

    useEffect(() => {
        (async ()=>{
            try {
                const response = await fetch(require('../scripts/apiLocation')+'/api/getuserinfo',{
                    method: 'GET',
                    mode: 'cors',
                    headers: {"Content-Type":"application/json", "token": localStorage.getItem("token")},
                })
                const parsedResponse = await response.json();
                if(response.ok){
                    setRedirect(true);
                }
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])
    return(
    <Wrapper>
        <Navbar></Navbar>
        <SelectorWrapper>
                <button style={{border: ActiveComponents=="login" ? "2px solid black" : "none"}} id="login" onClick={function(){Handler("login")}}>
                    Login
                </button>  
                <button style={{border: ActiveComponents=="register" ? "2px solid black" : "none"}} id="register" onClick={function(){Handler("register")}}>
                    Register
                </button>
        </SelectorWrapper>
        <FormsWrapper>
            {ActiveComponents=="login"? <LoginForm/>:<RegisterForm/>}
        </FormsWrapper>
        {redirect?<Redirect to='/'/>:''}
        <Footer/>
    </Wrapper>
    );
}

export default LoginRegisterPage;