import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigation = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.phone === phone && storedUser.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            navigation('/'); 
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-10 text-cyan-600">Login</h1>
            <form className="w-3/4 mx-auto" onSubmit={handleLogin}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input type="text" placeholder="phone" className="input input-bordered" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control my-6">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
