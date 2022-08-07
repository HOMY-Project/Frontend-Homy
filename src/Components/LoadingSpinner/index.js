import React from 'react';
import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = () => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 55, color: '#0F6AD0' }} spin />} />
);

export default LoadingSpinner;
