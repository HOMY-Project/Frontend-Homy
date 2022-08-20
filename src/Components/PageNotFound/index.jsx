import { Button, Result } from 'antd';
import React from 'react';
import notFound from '../../assets/pagenotfound.png';
import { Link } from 'react-router-dom';
import Header from '../Header';
import MainFooter from '../Footer';

const PageNotFound = () => {
  return(
    <><Header /><Result
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      icon={<img src={notFound} alt="empty-cart" style={{ width: '250px' }} />}
      extra={<Link to="/"> <Button type="primary">back Home</Button> </Link>} /><MainFooter /></>
  )
  };

export default PageNotFound;