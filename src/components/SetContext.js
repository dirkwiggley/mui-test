import React from 'react';
import {useAuthContext} from './AuthContext';

const SetContext = ( ) => {
    const { auth , setAuth } = useAuthContext();
    const changeHandler = (event) => {
        const value = document.getElementById("newContext").value;
        setAuth(value);
    }

    return (
        <>
            <div>This is the SetContext Component The auth context value is {auth}</div>
            <div><input id="newContext"></input></div>
            <div><button onClick={changeHandler}>Set Context</button></div>
        </>
    );
}

export default SetContext;