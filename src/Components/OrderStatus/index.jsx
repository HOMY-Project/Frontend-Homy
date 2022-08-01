import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const OrderStatus = () => {
  return (
    <Container fluid>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Orders</Breadcrumb.Item>
    </Breadcrumb>
    <p>To track your order please enter your Order ID in the box below and press the "Check" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
    <Form style={{ marginTop: "2%" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Order Number</Form.Label>
        <Form.Control type="password" placeholder="Enter Order Number" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ backgroundColor: '#0F6AD0'}}>
        Check
      </Button>
    </Form>
    </Container>
  );
}

export default OrderStatus;