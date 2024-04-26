//making auth context here

import { createContext, useState} from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    //logiing in user setting his access token.
    const login = (accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

    }
    //logging out user 
    const logout = (accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    }
    //function to get current user based on his access token or logged in user.
    const getCurrentUser = (user) => {
        setCurrentUser(user);
    }

    const authValues = {
        login,
        logout,
        accessToken,
        refreshToken,
        currentUser,
        setCurrentUser,
        getCurrentUser
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