import React from 'react';
import bg from "../../assets/welcometohomy.jpg";

function WelcomeToHomy() {
    return (
        <div className="WelcomeToHomy" style={{ marginTop: "4%" }}>
            <img src={bg} alt='welcome to homy' className="welcome-to-homy" style={{ width: '100%' }}/>
        </div>
    );
}

export default WelcomeToHomy;