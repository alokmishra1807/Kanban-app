import { createContext, useContext, useState } from "react";


export const backendUrl = "http://localhost:4000";

export const AuthContext = createContext();

export const useAuthContext =()=>
{
    return useContext(AuthContext);
}


export const AuthContextProvider = ({children}) =>{
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("Kanban-app")) || null);

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>;
};