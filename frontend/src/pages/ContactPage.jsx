import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const BigDiv = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 50px 200px;
`;
const Nume = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  `;
const Label = styled.label`

    font-size: 110%;
`;

const TxtArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  height: 200px;
`;

const SubmitBtn = styled.button`
  position: relative;
  padding: 10px 20px ;
  background: #3593e0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 110%;
  :hover{
    background: #197fd3;
  }
`


function ContactPage() {
  const [state, setState] = useState('ceva');
  return (
    <>
    <Navbar/>
    <BigDiv>
      <Label>First Name : </Label>
      <Nume
        type="text"
        id="lname"
        name="lastname"
        placeholder="Your first name"
      ></Nume>
      <Label>Last Name : </Label>
      <Nume
        type="text"
        id="lname"
        name="lastname"
        placeholder="Your last name"
      ></Nume>
      <Label>Email : </Label>
      <Nume
        type="text"
        id="lname"
        name="lastname"
        placeholder="Your email"
      ></Nume>
      <Label>Subject : </Label>
      <TxtArea
        id="subject"
        name="subject"
        placeholder="Write us your message"
      ></TxtArea>
      <SubmitBtn>Send</SubmitBtn>
    </BigDiv>
    <Footer/>
    </>
  );
}

export default ContactPage;