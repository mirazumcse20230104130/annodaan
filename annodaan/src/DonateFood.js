import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

const DonateFood = () => {
  const [foodItems, setFoodItems] = useState([{ id: 1, type: '', quantity: '', fresh: false }]);
  const [selectedDate, setSelectedDate] = useState(''); // Store as YYYY-MM-DD
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const maxItems = 10;

  // Handle date change, keeping YYYY-MM-DD format
  const handleDateChange = (e) => {
    const inputDate = e.target.value; // YYYY-MM-DD from date input
    if (inputDate) {
      const date = new Date(inputDate);
      if (date instanceof Date && !isNaN(date)) {
        setSelectedDate(inputDate); // Keep as YYYY-MM-DD
        setErrors((prev) => ({ ...prev, date: '' }));
      } else {
        setSelectedDate('');
        setErrors((prev) => ({ ...prev, date: 'Invalid date' }));
      }
    } else {
      setSelectedDate('');
      setErrors((prev) => ({ ...prev, date: 'Date is required' }));
    }
  };

  // Format date for display as YYYY/MM/DD
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${year}/${month}/${day}`; // YYYY/MM/DD
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
                value={selectedDate} // YYYY-MM-DD
                onChange={handleDateChange}
                aria-describedby="date-error"
              />
              {selectedDate && <p>Selected Date: {formatDisplayDate(selectedDate)}</p>} {/* YYYY/MM/DD */}
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
              <Row key={item.id} className="mb-3 align-items-start food-item-row">
                <Col md={4} className="d-flex flex-column">
                  <Form.Control
                    type="text"
                    placeholder="Enter Food Name or Type"
                    value={item.type}
                    onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                    aria-describedby={`food-type-error-${item.id}`}
                    className="mb-1"
                  />
                  {errors[`foodItems.${item.id}.type`] && (
                    <p id={`food-type-error-${item.id}`} className="text-danger mb-0">
                      {errors[`foodItems.${item.id}.type`]}
                    </p>
                  )}
                </Col>
                <Col md={4} className="d-flex flex-column">
                  <Form.Control
                    type="text"
                    placeholder="Quantity (for approximately how many people)"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}
                    aria-describedby={`food-quantity-error-${item.id}`}
                    className="mb-1"
                  />
                  {errors[`foodItems.${item.id}.quantity`] && (
                    <p id={`food-quantity-error-${item.id}`} className="text-danger mb-0">
                      {errors[`foodItems.${item.id}.quantity`]}
                    </p>
                  )}
                </Col>
                <Col md={2} className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Freshly Made"
                    checked={item.fresh}
                    onChange={(e) => handleChange(item.id, 'fresh', e.target.checked)}
                  />
                </Col>
                <Col md={2} className="d-flex align-items-center justify-content-end">
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
            <div className="gallery-image-placeholder mb-3">
              <p className="text-center">You can add visuals!</p>
            </div>
            {/* Placeholder for future image from gallery (to be implemented via backend) */
            /* Replace the div above with: <img src={/* backend image URL */} alt="Gallery Image" className="gallery-image" /> */}
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