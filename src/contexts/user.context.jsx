import { 
    useState, 
    createContext, 
    useEffect 
} from "react";

import { 
    onAuthStateChangedListener, 
    createUserDoumentFromAuth,
    // signOutUser 
} from "../utils/firebase/firebase.utlis";

// acutal value we want to access
export const UserContext =createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) =>{
    const [currentUser ,setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    // signOutUser()
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            // console.log(user);
            if(user){
                createUserDoumentFromAuth(user); 
            }
            setCurrentUser(user);
        });
        
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
