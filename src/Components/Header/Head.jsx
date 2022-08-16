import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { useTranslation } from "react-i18next";

const Head = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <Row>
              <Col style={{ display: "flex", justifyContent: "center" }} >{t('Accepting order 24 hours')}</Col>
              <Col style={{ display: "flex", justifyContent: "center" }}>{t('Free delivery for more than 50 KWD')}</Col>
              <Col style={{ display: "flex", justifyContent: "center" }}>{t('Delivery within 24 hours')}</Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default Head;
