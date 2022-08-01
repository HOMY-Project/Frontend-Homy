import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const SubFooter = () => {
    return (
        <div>
            <Footer
                style={{
                    textAlign: 'center',
                }}
                >
                ©Homy - All Rights Reserved
            </Footer>           
        </div>
    );
}

export default SubFooter;