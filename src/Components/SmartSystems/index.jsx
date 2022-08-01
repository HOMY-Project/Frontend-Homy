import React from "react";
import Heading from "../Heading";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import smartsystem1 from "../../assets/smartsystem1.jpg";
import smartsystem2 from "../../assets/smartsystem2.jpg";
import "./index.css";

function SmartSystems() {
  return (
    <div style={{ padding: "0px 4%", marginTop: "5%"}} className="SmartSystems-holder">
      <Heading heading="Smart home systems: the right solution for your home" />
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={smartsystem1} />
          <Card.Body>
            <Card.Title>Save money and energy</Card.Title>
            <Card.Text>
              A major advantage of turning your house into a smart home is
              energy efficiency. Ideally, you can save energy and money by using
              your household appliances in a more targeted – and thus more
              effective – way.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Discover Smart Lighting <box-icon name="chevron-right" color="#0F6AD0"></box-icon>
            </small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={smartsystem2} />
          <Card.Body>
            <Card.Title>Make your smart home secure</Card.Title>
            <Card.Text>
              Your house and yard should always be adequately secured. Besides
              outdoor and indoor cameras, motion detectors, and door and window
              contacts, intelligent lighting control also offer additional
              protection.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Discover Security Cameras{" "}
              <box-icon name="chevron-right" color="#0F6AD0"></box-icon>
            </small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
}

export default SmartSystems;
