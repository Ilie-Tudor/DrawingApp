import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import teamIcon from '../Icons/team.svg'
import toolsIcon from '../Icons/tools.svg'
import goalIcon from '../Icons/goal.svg'

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #010606;
    padding-bottom: 50px;
`

const AboutWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;
`

const AboutCard = styled.div`
    position: relative;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 10px;
    height: 340px;
    padding: 30px 0px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    z-index: 20;
    :hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        overflow: visible;
        z-index: 21;
    }
    
`

const AboutIcon = styled.img`
    position: relative ;
    height: 160px;
    width: 160px;
    margin-bottom: 10px;
`

const AboutH1 = styled.h1`
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 64px;
`

const AboutH2 = styled.h2`
    font-size: 1rem;
    margin-bottom: 10px;
`

const AboutP = styled.p`
    position: relative;
    background: #fff;
    font-size: 1rem;
    text-align: center;
    padding: 5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`
export default function AboutPage (){
    return (
        <>
        <Navbar/>
        <AboutContainer id="about">
            <AboutH1>About us</AboutH1>
            <AboutWrapper>
                <AboutCard>
                    <AboutIcon src={teamIcon}/>
                    <AboutH2>Meet the creators</AboutH2>
                    <AboutP>Our names are Tudor Ilie, Daniel Baciu and Alex Barbu and we decided to not let our minds get rot in this season which is hot!</AboutP>
                </AboutCard>
                <AboutCard>
                    <AboutIcon src={goalIcon}/>
                    <AboutH2>The goal of this project</AboutH2>
                    <AboutP>
                        We designed a tool to help sketching your thoughts in a nice and productive way.</AboutP>
                </AboutCard>
                <AboutCard>
                    <AboutIcon src={toolsIcon}/>
                    <AboutH2>The tools we used</AboutH2>
                    <AboutP>The main tehnologies we used to build this awesome app were FabricJS, Postgresql, Express, React, NodeJS </AboutP>
                </AboutCard>
            </AboutWrapper>
        </AboutContainer>
        <Footer/>
        </>
    )
}