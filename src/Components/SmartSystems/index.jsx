import React from "react";
import Heading from "../Heading";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import smartsystem1 from "../../assets/smartsystem1.jpg";
import smartsystem2 from "../../assets/smartsystem2.jpg";
import { useTranslation } from "react-i18next";
import "./index.css";

function SmartSystems() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "0px 4%", marginTop: "5%"}} className="SmartSystems-holder">
      <Heading heading={t("lastSec")} />
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={smartsystem1} />
          <Card.Body>
            <Card.Title>{t('frTitle')}</Card.Title>
            <Card.Text>
            {t('frSubTitle')}{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
            {t('Discover Security Cameras')} <box-icon name="chevron-right" color="#0F6AD0"></box-icon>
            </small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={smartsystem2} />
          <Card.Body>
            <Card.Title>{t('scTitle')}</Card.Title>
            <Card.Text>
            {t('scSubTitle')}{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {t('Discover Security Cameras')}{" "}
              <box-icon name="chevron-right" color="#0F6AD0"></box-icon>
            </small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
}

export default SmartSystems;
