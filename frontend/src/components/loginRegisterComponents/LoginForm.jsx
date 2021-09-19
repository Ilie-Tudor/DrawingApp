import React, { useState } from 'react';
import ErrorBox from './ErrorBox';

function LoginForm() {
    const [details, setDetails] = useState({ nameOrEmail: "", password: ""});
    const [errorMsg, setErrorMsg] = useState('');
    const [visiblePass, setVisiblePass] = useState(false);

    async function submit(){
        try {
            const response = await fetch(require('../../scripts/apiLocation')+'/auth/login',{
                method: 'POST',
                mode: 'cors',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({user_nameOrEmail: details.nameOrEmail, user_password: details.password})
            })
            const parsedResponse = await response.json()
            if(response.ok){
                setErrorMsg('')
                localStorage.setItem("token",parsedResponse.token);
                window.location.href = '/'
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
        <div>
            <div className="form-inner">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="usernameOrEmail">Username or email:</label>
                    <input type="text" name="usernameOrEmail" id="usernameOrEmail" onChange={e=>setDetails({...details, nameOrEmail: e.target.value})} value={details.nameOrEmail} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type={visiblePass?'text':'password'} name="password" id="password" onChange={e=>setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
                <div className="form-group visiblePassGroup" >
                    <label htmlFor="seePassword">See password: </label>
                    <input type="checkbox" name='seePassword' id='seePassword' onChange={()=>{setVisiblePass(!visiblePass)}} />
                </div>
                <div className="form-group error-msg">
                   <ErrorBox errMsg={errorMsg}/>
                </div>
                <button className='formBtn' onClick={()=>{submit()}}>LOGIN</button>
            </div>
        </div>
    )
}

export default LoginForm;
