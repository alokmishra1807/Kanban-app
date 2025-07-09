import { createContext, useContext, useState } from "react";


export const backendUrl = "https://kanban-app-zku2.onrender.com";

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