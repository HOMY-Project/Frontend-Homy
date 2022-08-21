import React, { Component } from 'react';
import { Brands, ShopByCate, Slider, SuperDeals, SmartSystems,  WelcomeToHomy } from '../Components';
import Header from '../Components/Header';
import MainFooter from '../Components/Footer';

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <Slider />
                <ShopByCate />
                <SuperDeals />
                <SmartSystems />
                <WelcomeToHomy />
                <Brands />  
                <MainFooter />
            </div>
        );
    }
}

export default Home;