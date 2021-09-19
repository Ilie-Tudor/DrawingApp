import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Wrapper = styled.div`
    background: ghostwhite;
    position: relative;
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >div{
        position: relative;
        display: flex;
        >h1{
            padding: 20px;
            width: 100%;
            max-width: 100px;
            height: 200px;
            display: flex;
            align-items: center;
        }
        >.errCode{
            border-right: 2px solid black;
            display: flex;
            justify-content: flex-end;
        }
    }
    >h3{
        width: 100%;
        max-width: 300px;
        text-align: center;
    }
`

export default function NotFoundPage() {
    return (
        <>
        <Navbar/>
        <Wrapper>
            <div>
                <h1 className='errCode'><div>404</div></h1>
                <h1 className = 'errMsg'><div> Page not found</div></h1>
            </div>
            <h3><p> We are sorry but it seems the page you are looking for doesn't exist</p></h3>

        </Wrapper>
        <Footer/>
        </>
    )
}
