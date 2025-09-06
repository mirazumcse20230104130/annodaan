import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card, Row, Col } from 'react-bootstrap';

// Carousel images
import carousel1 from './images/carousel1.jpg';
import carousel2 from './images/carousel2.jpg';
import carousel3 from './images/carousel3.jpg';
import carousel4 from './images/carousel4.jpg';

// Card images
import needFoodImg from './images/needfood.png';
import donateFoodImg from './images/donatefood.png';
import volunteerImg from './images/volunteer.png';

const MainContent = () => {
  return (
    <div>
      {/* Carousel */}
      <div className="carousel-container">
        <Carousel fade>
          {[carousel1, carousel2, carousel3, carousel4].map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 carousel-img"
                src={img}
                alt={`Slide ${idx + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Description */}
      <div className="main-description">
        <div className="content-wrapper">
          <h2>Annodaan</h2>
          <p>
            Annodaan (অন্নদান) is a community-driven platform dedicated to reducing food waste
            and feeding those in need. We believe that no one should sleep hungry while good food
            goes to waste. Through Annodaan, individuals, restaurants, event organizers, and
            households can easily donate surplus food to nearby NGOs, shelters, and people in need.
          </p>
          <p>
            Whether it’s a warm meal from a restaurant, leftovers from a celebration, or extra
            groceries from your home — every contribution matters. With the help of our volunteers,
            we ensure safe, respectful, and timely food delivery to those who need it most.
          </p>
        </div>
      </div>

      {/* Cards */}
      <Row className="right-content-cards text-center">
        <Col md={4} sm={12}>
          <Card className="option-card">
            <Card.Img variant="top" src={needFoodImg} />
            <Card.Body>
              <Card.Title>Need Food</Card.Title>
              <Card.Text>
                Reach out to access nutritious meals and support to get through challenging times. No one should have to go hungry.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Link to="/donate-food" style={{ textDecoration: 'none' }}>
            <Card className="option-card">
              <Card.Img variant="top" src={donateFoodImg} />
              <Card.Body>
                <Card.Title>Donate Food</Card.Title>
                <Card.Text>
                  Make a meaningful difference in someone’s life today. Your food donations help provide healthy meals to those in need, creating hope and nourishing communities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} sm={12}>
          <Card className="option-card">
            <Card.Img variant="top" src={volunteerImg} />
            <Card.Body>
              <Card.Title>Volunteer</Card.Title>
              <Card.Text>
                Join our team to help deliver food safely and support communities. Your time and effort make a direct impact.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MainContent;