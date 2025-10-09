// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) =>
{
    return (
        <>
            <Navbar />
            <main style={{ padding: '0.5rem', minHeight: '80vh' }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
