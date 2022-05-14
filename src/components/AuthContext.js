import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState("");
    const state = {
        auth,
        setAuth
    }
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    );
}