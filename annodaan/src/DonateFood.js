import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

const DonateFood = () => {
  const [foodItems, setFoodItems] = useState([{ id: 1, type: '', quantity: '', fresh: false }]);
  const [selectedDate, setSelectedDate] = useState('');
  const maxItems = 10; // Maximum number of food items

  const handleAddMore = () => {
    if (foodItems.length >= maxItems) {
      return; // Prevent adding more items if limit is reached
    }
    setFoodItems([...foodItems, { id: foodItems.length + 1, type: '', quantity: '', fresh: false }]);
  };

  const handleChange = (id, field, value) => {
    setFoodItems(foodItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (date instanceof Date && !isNaN(date)) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      setSelectedDate(`${day}/${month}/${year}`);
    } else {
      setSelectedDate('');
    }
  };

  return (
    <div className="donate-food-page">
      <h2 className="donate-title">Donate Food</h2>
      <Form>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the person/shop/restaurant/organization donating the food"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Day Food was Made</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate ? selectedDate.split('/').reverse().join('-') : ''}
                onChange={handleDateChange}
              />
              {selectedDate && <p>Selected Date: {selectedDate}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message for the receiver</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Type something special" />
            </Form.Group>

            <h3 className="food-details-title">Food Details</h3>
            {foodItems.map((item) => (
              <Row key={item.id} className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Food Name or Type"
                    value={item.type}
                    onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Quantity (for how many people)"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Check
                    type="checkbox"
                    label="Freshly Made"
                    checked={item.fresh}
                    onChange={(e) => handleChange(item.id, 'fresh', e.target.checked)}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setFoodItems(foodItems.filter(i => i.id !== item.id))}
                    aria-label={`Remove food item ${item.id}`}
                  >
                    ×
                  </Button>
                </Col>
              </Row>
            ))}
            {foodItems.length >= maxItems && (
              <Alert variant="warning" className="mt-3">
                You have reached the maximum limit of {maxItems} food items. Please submit again to donate more food. Thank you for your cooperation.
              </Alert>
            )}
            <Button
              variant="outline-warning"
              onClick={handleAddMore}
              disabled={foodItems.length >= maxItems}
              aria-label="Add another food item"
            >
              Add More
            </Button>
          </Col>

          <Col md={4} className="sidebar">
            <Button variant="warning" className="w-100 mb-2" aria-label="Add visuals to donation">
              Add Visuals
            </Button>
            <Button variant="warning" className="w-100 mb-2" aria-label="View form gallery">
              Form Gallery
            </Button>
            <Button variant="warning" className="w-100 mb-2" aria-label="Add video to donation">
              Add Video
            </Button>
            <div className="motivation-box">
              <img src="/logo512.png" alt="Annodaan motivation icon" className="motivation-icon" />
              <p>You’re doing great work!<br />Taking a step toward a world where no food goes to waste.</p>
            </div>
          </Col>
        </Row>

        <Button variant="warning" type="submit" className="w-25 mt-3" aria-label="Submit donation">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DonateFood;