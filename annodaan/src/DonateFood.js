import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

const DonateFood = () => {
  const [foodItems, setFoodItems] = useState([{ id: 1, type: '', quantity: '', fresh: false }]);
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const maxItems = 10;

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (date instanceof Date && !isNaN(date)) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      setSelectedDate(`${day}/${month}/${year}`);
      setErrors((prev) => ({ ...prev, date: '' }));
    } else {
      setSelectedDate('');
    }
  };

  const handleChange = (id, field, value) => {
    setFoodItems(foodItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
    setErrors((prev) => ({ ...prev, [`foodItems.${id}.${field}`]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!selectedDate) {
      newErrors.date = 'Date is required';
    }
    foodItems.forEach((item) => {
      if (!item.type.trim()) {
        newErrors[`foodItems.${item.id}.type`] = 'Food name or type is required';
      }
      if (!item.quantity.trim()) {
        newErrors[`foodItems.${item.id}.quantity`] = 'Quantity is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMore = () => {
    if (foodItems.length >= maxItems) {
      return;
    }
    setFoodItems([...foodItems, { id: foodItems.length + 1, type: '', quantity: '', fresh: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmissionStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    // Log data for now (replace with backend API call later)
    console.log({ name, message, foodItems, selectedDate });
    setSubmissionStatus({ type: 'success', message: 'Donation submitted successfully! You can now add more food items.' });
    setFoodItems([{ id: 1, type: '', quantity: '', fresh: false }]);
    setSelectedDate('');
    setName('');
    setMessage('');
    setErrors({});
    e.target.reset();
  };

  return (
    <div className="donate-food-page">
      <h2 className="donate-title">Donate Food</h2>
      {submissionStatus && (
        <Alert variant={submissionStatus.type === 'success' ? 'success' : 'danger'} className="mt-3">
          {submissionStatus.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the person/shop/restaurant/organization donating the food"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p id="name-error" className="text-danger">
                  {errors.name}
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Day Food was Made</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate ? selectedDate.split('/').reverse().join('-') : ''}
                onChange={handleDateChange}
                aria-describedby="date-error"
              />
              {selectedDate && <p>Selected Date: {selectedDate}</p>}
              {errors.date && (
                <p id="date-error" className="text-danger">
                  {errors.date}
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message for the receiver</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type something special"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <h3 className="food-details-title">Food Details</h3>
            {foodItems.map((item, index) => (
              <Row key={item.id} className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Food Name or Type"
                    value={item.type}
                    onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                    aria-describedby={`food-type-error-${item.id}`}
                  />
                  {errors[`foodItems.${item.id}.type`] && (
                    <p id={`food-type-error-${item.id}`} className="text-danger">
                      {errors[`foodItems.${item.id}.type`]}
                    </p>
                  )}
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Quantity (for approximately how many people)"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}
                    aria-describedby={`food-quantity-error-${item.id}`}
                  />
                  {errors[`foodItems.${item.id}.quantity`] && (
                    <p id={`food-quantity-error-${item.id}`} className="text-danger">
                      {errors[`foodItems.${item.id}.quantity`]}
                    </p>
                  )}
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
                    aria-label={`Remove food item ${index + 1}`}
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
            <p className="add-visuals-text">You can add visuals!</p>
            <Button variant="warning" className="w-100 mb-2" aria-label="View gallery">
              From Gallery
            </Button>
            <div className="motivation-box">
              <div className="motivation-icon-placeholder"></div>
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