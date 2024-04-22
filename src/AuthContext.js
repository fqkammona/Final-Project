import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth } from './firebase-config'; // Make sure this is correctly imported

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                // Force a token refresh whenever the auth state changes
                user.getIdToken(true).then(() => {
                    setCurrentUser(user);
                }).catch(error => {
                    console.error("Error refreshing token", error);
                    if (error.code === 'auth/user-token-expired' || error.code === 'auth/user-not-found') {
                        // Force logout if the token is invalid or the user is not found
                        signOut(auth);
                    }
                });
            } else {
                // No user is signed in
                setCurrentUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const value = { currentUser, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
