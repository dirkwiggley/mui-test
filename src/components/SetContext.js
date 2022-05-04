import React from 'react';
import AuthContext from './AuthContext';

const SetContext = ( { setAuth } ) => {
    const auth = React.useContext(AuthContext);

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