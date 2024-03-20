import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = (e) => {
        e.preventDefault();
        const newUser = { name, phone, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        alert('Registration successful!');
        navigation('/login'); // Redirect to login page after registration
    };

    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-10 text-cyan-600">Registration</h1>
            <form className="w-3/4 mx-auto" onSubmit={handleRegistration}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
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
                </div>
                <div className="form-control my-6">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;
