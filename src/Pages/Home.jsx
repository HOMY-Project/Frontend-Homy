import React, { Component } from 'react';
import { Brands, ShopByCate, Slider, SuperDeals, SmartSystems,  WelcomeToHomy } from '../Components';

class Home extends Component {
    render() {
        return (
            <div>
                <Slider />
                <ShopByCate />
                <SuperDeals />
                <SmartSystems />
                <WelcomeToHomy />
                <Brands /> 
            </div>
        );
    }
}

export default Home;