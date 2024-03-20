import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigation = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigation('/login');
    };

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const navLinks = isLoggedIn ? (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/allProducts">Products</NavLink>
            </li>
            <li>
                <NavLink to="/carts">Carts</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink to="/register">Register</NavLink>
            </li>
        </>
    );

    return (
        <div className="">
            <div className="navbar p-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-outline btn-info lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to="/" className="normal-case text-cyan-800 font-serif font-extrabold text-4xl lg:text-6xl">Comfy</Link>
                </div>
                <div className="navbar-end">
                    <div className="flex-none gap-2">
                        {/* Additional content can go here */}
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-cyan-300 my-2"></div>
            <div className="justify-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6">
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
