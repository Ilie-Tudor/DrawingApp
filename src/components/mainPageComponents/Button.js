import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
let Wrapper=styled.div`
:root{
    --primary: #fff;
}

.btn{
    padding: 8px 20px;
    border-radius: 2px;
    outline: none;
    border: none;
    cursor: pointer;
}

.btn--primary{
    background-color: var(--primary);
    color: #242424;
    border: 1px solid var(--primary);
}

.bnt--outline{
    background-color: transparent;
    color: #fff;
    padding: 0px 20px;
    border: 1px solid var(--primary);
    transition: all 0.3s ease-out;
}

.btn--medium{
    padding: 8px 20px;
    font-size: 20px;
}

.btn--large{
    padding: 12px 26px;
    font-size: 20px;
}

.btn--medium:hover,
.btn--large:hover{
    background: #fff;
    color: #242424;
    transition: all 0.3s ease-out;
}
`;

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) 
        ? buttonSize
        : SIZES[0]

    return(
        <Wrapper>
            <Link to='/sign-up' className='btn-mobile'>
                <button 
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
                >
                {children}
                </button>
            </Link>
        </Wrapper>
    )
}