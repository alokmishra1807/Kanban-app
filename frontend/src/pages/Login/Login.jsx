import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../Hooks/useLogin';

const Login = () => {
  const { loading, login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className='flex flex-col min-h-screen min-w-screen items-center justify-center bg-gray-100 pl-0 pr-0 pt-0 pb-0 overflow-hidden'>

      <div className='w-full max-w-sm p-6 rounded-lg shadow-md bg-white'>
        <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6'>
          Login <span className='text-blue-600'>Kanban-App</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='text'
              placeholder='Enter Email'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-sm text-right">
            <Link
              to="/signup"
              className='text-blue-600 hover:underline'
            >
              Don&apos;t have an account?
            </Link>
          </div>

          <button
            className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
