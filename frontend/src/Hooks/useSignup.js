import { useState } from 'react';
import axios from 'axios';
import { backendUrl, useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [Loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, email, password, confirmedPassword }) => {
    const success = handleInputErrors({ fullName, email, password, confirmedPassword });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/register`,
        {
          fullName,
          email,
          password,
          confirmedPassword,
        },
        {
          withCredentials: true, 
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );

      const data = res.data;
      console.log('Server Response:', data);

      if (data._id) {
        localStorage.setItem("Kanban-app", JSON.stringify(data));
        setAuthUser(data);
        alert("Signup successful!");
      } else {
        console.log(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { Loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, email, password, confirmedPassword }) {
  if (!fullName || !email || !password || !confirmedPassword) {
    console.log("Please fill in all the fields");
    return false;
  }
  if (password !== confirmedPassword) {
    console.log("Passwords didn't match");
    return false;
  }
  if (password.length < 6) {
    console.log("Password must have at least 6 characters");
    return false;
  }

  return true;
}
