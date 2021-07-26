import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styled from 'styled-components';
let SelectorWrapper=styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    #login{
        
        width: 150px;
    }
    #register{
        width: 150px;
    }
`
function LoginRegisterPage() {
    let [ActiveComponents, setActiveComponent]=useState("login")
    function Handler(name)
    {
        setActiveComponent(name);
    }

    return(
    <>
        <SelectorWrapper>
                <button style={{borderBottom: ActiveComponents=="login" ? "1px solid black" : "none"}} id="login" onClick={function(){Handler("login")}}>
                    Login
                </button>  
                <button style={{borderBottom: ActiveComponents=="register" ? "1px solid black" : "none"}} id="register" onClick={function(){Handler("register")}}>
                    Register
                </button>
        </SelectorWrapper>
        <div className = "App">
            {ActiveComponents=="login"? <LoginForm/>:<RegisterForm/>}
        </div>
    </>
    );
}

export default LoginRegisterPage;