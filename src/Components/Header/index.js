import React from 'react';
import Head from './Head';
import Navbar from './Navbar';
import Subnav from './Subnav';

const Header = () => {
    return (
            <>
            <Head />
            <Navbar />
            {/* <Subnav /> */}
            </>
    );
};

export default Header;