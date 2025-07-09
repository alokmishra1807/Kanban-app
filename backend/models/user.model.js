import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
   

  },
  email: {
    type: String,
  
    unique: true,
  
  },
  password: {
    type: String,
   
  },

  profilePic: {
    type: String, 
    default: '',  
  },
},{timestamps:true} );

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;