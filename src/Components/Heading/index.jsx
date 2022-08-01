import { Divider } from "antd";
import React from "react";

const Heading = ({ heading }) => {
  return (
    <div style={{ marginTop: '3%' }}>
      <h4 className="heading-h3" style={{ color: ' #18181A', fontWeight: '600' }}>
        {heading}
      </h4>
      <Divider />
    </div>
  );
};

export default Heading;
