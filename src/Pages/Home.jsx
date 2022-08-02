import React, { Component } from 'react';
import WelcomeToHomy from '../Components/WelcomeToHomy';
import SmartSystems from '../Components/SmartSystems';
import SuperDeals from '../Components/SuperDeals';
import Slider from '../Components/Slider';
import ShopByCate from '../Components/ShopBycategory';


class Home extends Component {
    render() {
        return (
            <div>
                <Slider />
                <ShopByCate />
                <SuperDeals />
                <SmartSystems />
                <WelcomeToHomy /> 
            </div>
        );
    }
}

export default Home;