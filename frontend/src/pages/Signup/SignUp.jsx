import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../Hooks/useSignup';

const SignUp = () => {
  const [Inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    image: ""
  });

  const { Loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(Inputs);
  };

  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center bg-gray-100 px-4 overflow-hidden'>
      <div className='w-full max-w-sm p-6 rounded-lg shadow-md bg-white'>
        <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6'>
          Sign Up <span className='text-blue-600'>Kanban-App</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <input
              type='text'
              placeholder='Enter Your Name'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              value={Inputs.fullName}
              onChange={(e) => setInputs({ ...Inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='text'
              placeholder='Enter Email'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              value={Inputs.email}
              onChange={(e) => setInputs({ ...Inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              value={Inputs.password}
              onChange={(e) => setInputs({ ...Inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              value={Inputs.confirmedPassword}
              onChange={(e) => setInputs({ ...Inputs, confirmedPassword: e.target.value })}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Profile Image</label>
            <input
              type='file'
              accept='image/*'
              className='w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm '
              onChange={(e) => setInputs({ ...Inputs, image: e.target.files[0] })}
            />
          </div>

          <div className="text-sm text-right">
            <Link to="/login" className='text-blue-600 hover:underline'>
              Already have an account?
            </Link>
          </div>

          <button
            className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed'
            disabled={Loading}
          >
            {Loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp
