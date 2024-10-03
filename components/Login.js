import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';


const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '123456') {
            onLogin({ user: 'admin', method: 'username' });
        } else {
            alert('Invalid username or password');
        }
    };

    const handleGoogleSuccess = (response) => {
        console.log('Google OAuth Response:', response);
    
        try {
            // Extract the token from the response
            const token = response.credential;
    
            // Split the JWT token and decode the payload
            const base64Url = token.split('.')[1]; // Get the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Adjust for URL encoding
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            // Parse the payload as JSON to get the user info
            const decoded = JSON.parse(jsonPayload);
    
            // Extract email and name from the decoded token
            const email = decoded.email || 'No email provided';
            const name = decoded.name || email.split('@')[0];  // Fallback to email's username if name is not available
    
            // Log the decoded token for debugging
            console.log('Decoded token:', decoded);
    
            // Proceed with login using the extracted name and email
            onLogin({ user: name, email: email, method: 'google' });
        } catch (error) {
            console.error('Error decoding token:', error);
            alert('Google login failed');
        }
    };
    

    const handleGoogleFailure = (error) => {
        console.error('Google login failed:', error);
        alert('Google login failed');
    };

    const handleForgot = () => {
        alert('Redirecting to password recovery');
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-sm p-8 space-y-4 rounded-lg shadow-lg'>
                <h2 className='font-eduaustralia italic text-2xl text-center text-white'>LOGIN</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full p-1 text-gray-200 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300'
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-1 mt-2 text-gray-200 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300'
                    />
                    <button
                        type="button"
                        onClick={handleForgot}
                        className='mx-52 whitespace-nowrap text-sm text-gray-400 hover:underline'
                    >Forgot password?</button>
                    <button
                        type="submit"
                        className='w-24 mt-3 mx-28 p-3 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    >Login</button>
                </form>
                <p className='text-gray-400 mx-36'>or</p>
                <div className='mx-16'>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
