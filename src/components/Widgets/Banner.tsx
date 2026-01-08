import React from 'react';
import { Col, Row } from 'react-bootstrap';

type BannerProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

function Banner({
  title,
  subtitle,
  children,
}: BannerProps) {

  return <Row>
    <Col>
    <div className="text-animated-wrapper">
        <h1>{title}</h1>
        <span>{subtitle}</span>
        { children && children}
    </div>
    </Col>     
  </Row>
  
  
};

export default Banner;
