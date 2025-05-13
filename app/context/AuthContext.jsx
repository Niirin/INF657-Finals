import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth } from '../utils/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    
    const createUser= (email, pw) => {
        return createUserWithEmailAndPassword(auth, email, pw);
    };

    const updateUser= (name, email ) => {
        return updateProfile(auth.currentUser, {
            name,
            email,
            displayName: name,
        }).then(() => {
            console.log(auth.currentUser.displayName, auth.createUser.email);
            alert('Your profile has been updated.');
        })
    };

    const signIn= (email, pw) => {
        return signInWithEmailAndPassword(auth, email, pw);
    };

    const logOut= () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            //console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <UserContext.Provider value={{createUser, updateUser, user, logOut, signIn}}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth= () => {  
    return useContext(UserContext);
}