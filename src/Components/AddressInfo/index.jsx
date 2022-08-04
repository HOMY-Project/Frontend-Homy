import React from "react";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const AddressInfo = () => {
  return (
    <div>
      <Container fluid style={{ marginTop: "3%" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item active>Address Information</Breadcrumb.Item>
        </Breadcrumb>
        
      </Container>
    </div>
  );
};

export default AddressInfo;
