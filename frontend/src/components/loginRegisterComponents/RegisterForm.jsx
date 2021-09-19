import React, { useState } from 'react';
import ErrorBox from './ErrorBox';


function RegisterForm() {
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    const [errorMsg, setErrorMsg] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);


    async function submit(){
        try {
            const response = await fetch(require('../../scripts/apiLocation')+'/auth/register',{
                method: 'POST',
                mode: 'cors',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({user_name: details.name, user_email: details.email, user_password: details.password})
            })
            const parsedResponse = await response.json()
            if(response.ok){
                setErrorMsg('')
                localStorage.setItem("token",parsedResponse.token);
                window.location.href = '/'
            }
            else{
                setErrorMsg(parsedResponse)
                console.log(response.statusText)
                setErrorMsg(parsedResponse)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="form-inner">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="name" id="name" onChange={e=>setDetails({...details, name: e.target.value})} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={e=>setDetails({...details, email: e.target.value})} value={details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type={visiblePass?'text':'password'} name="password" id="password" onChange={e=>setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
                <div className="form-group visiblePassGroup">
                    <label htmlFor="seePassword">See password: </label>
                    <input type="checkbox" name='seePassword' id='seePassword' onChange={()=>{setVisiblePass(!visiblePass)}} />
                </div>
                <div className="form-group error-msg">
                   <ErrorBox errMsg={errorMsg} />
                </div>
                <button className='formBtn' onClick={()=>{submit()}}>REGISTER</button>
            </div>
        </div>
    )
    
}

export default RegisterForm;