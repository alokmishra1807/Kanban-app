import React, { useState } from 'react';
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
 const [loading, setLoading] = useState(false);
 const { setAuthUser } = useAuthContext();

 const login = async({ email, password }) => {

    const success = handleInputErrors( email, password );
    if (!success) return;




    setLoading(true);
     try {
      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password },
        {
          withCredentials: true, 
        }
      );

      const data = res.data;
console.log(data)
        // Log the response to verify the structure
       // console.log('Server Response:', data);

        // Check if login was successful by verifying the existence of _id or other required fields
        if (data._id) {
            localStorage.setItem("Kanban-app", JSON.stringify(data));
            setAuthUser(data);
            alert("Login successful!");
        } else {
            alert(data.message || "Login failed");
        }

    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
 };

 return { loading, login };
};

export default useLogin;


function handleInputErrors(email, password) {
    if ( !email || !password ) {
        alert("Please fill in all the fields");
        return false;
    }
   

    return true;
}