
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokenSetCookie.js";
import User from "../models/user.model.js";
import getBuffer from "../utils/dataUri.js";
import cloudinary from "cloudinary";


export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmedPassword} = req.body;
   
   

    if (password !== confirmedPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
       
    });

    if (newUser) {
 generateTokenAndSetCookie(newUser._id,res)

      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
 try {
    const {email,password}  = req.body;
const user = await User.findOne({email});
const IscorrectPassword = await bcrypt.compare(password,user?.password || "")
if(!user || !IscorrectPassword){
    return res.status(400).json({ error: "Invalid email/Password" });
}

generateTokenAndSetCookie(user._id,res)


return res.status(201).json({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  profilepic: user.profilePic,
});

 } catch (error) {
    console.log("Error in signin controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
 }
};

export const logout = async (req, res) => {
 try {
res.cookie("jwt","",{maxAge:0});
res.status(200).json({message:"Logged Out successfully"})
    
 } catch (error) {
    console.log("Error in logout controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
 }
}; 


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id fullName email profilePic'); 
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};