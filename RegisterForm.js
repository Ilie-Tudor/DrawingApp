import React, { useState } from 'react';

function RegisterForm() {
    const [details, setDetails] = useState({name: "", email: "", password: "", retype: ""});

    return (
        <form>
            <div className="form-inner">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" onChange={e=>setDetails({...details, name: e.target.value})} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={e=>setDetails({...details, email: e.target.value})} value={details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e=>setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
                <div className="form-group">
                    <label htmlFor="Re-type password">Re-type Password:</label>
                    <input type="password" name="re-typePassword" id="re-typePassword" onChange={e=>setDetails({...details, retype: e.target.value})} value={details.retype} />
                </div>
                
                <input type="submit" value="REGISTER"></input>
            </div>
        </form>
    )
    
}

export default RegisterForm;