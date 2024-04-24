//making auth context here

import { createContext, useState} from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const login = (accessToken, refreshToken) => {
        setAccessToken(accessToken);
        console.log(accessToken);
        setRefreshToken(refreshToken);
        console.log(refreshToken);
    }

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
    }

    const authValues = {
        login,
        logout,
        accessToken,
        refreshToken
    }

    return (
        <>
            <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
        </>
    );
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};