import React from 'react';
import WelcomeToHomy from '../Components/WelcomeToHomy';
import SmartSystems from '../Components/SmartSystems';
import Slider from '../Components/Slider';
import ShopByCate from '../Components/ShopBycategory';

function Home() {
    return (
        <div>
            <Slider />
            <ShopByCate />
            <SmartSystems />
            <WelcomeToHomy />
        </div>
    );
}

export default Home;