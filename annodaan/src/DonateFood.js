import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const DonateFood = () => {
  const [foodItems, setFoodItems] = useState([{ id: 1, type: "", quantity: "" }]);
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [foodType, setFoodType] = useState("Fresh Food");
  const [submitting, setSubmitting] = useState(false); // New state to track submission
  const maxItems = 10;

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate) {
      const date = new Date(inputDate);
      const today = new Date();
      let cutoffDate;
      if (foodType === "Fresh Food") {
        cutoffDate = new Date(today.setDate(today.getDate() - 2));
      } else { // Dry Food
        cutoffDate = new Date(today.setMonth(today.getMonth() - 3));
      }
      if (date instanceof Date && !isNaN(date) && date >= cutoffDate) {
        setSelectedDate(inputDate);
        setErrors((prev) => ({ ...prev, date: "" }));
      } else {
        setSelectedDate("");
        setErrors((prev) => ({
          ...prev,
          date: `Date must be within the last ${foodType === "Fresh Food" ? "2 days" : "3 months"}`,
        }));
      }
    } else {
      setSelectedDate("");
      setErrors((prev) => ({ ...prev, date: "Date is required" }));
    }
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  const handleChange = (id, field, value) => {
    setFoodItems(
      foodItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    setErrors((prev) => ({ ...prev, [`foodItems.${id}.${field}`]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!selectedDate) newErrors.date = "Date is required";
    foodItems.forEach((item) => {
      const quantityNum = parseInt(item.quantity);
      if (!item.type.trim())
        newErrors[`foodItems.${item.id}.type`] = "Food name or type is required";
      if (!item.quantity.trim() || isNaN(quantityNum) || quantityNum <= 0)
        newErrors[`foodItems.${item.id}.quantity`] =
          "Quantity must be a valid number";
    });
    setErrors(newErrors);
    console.log("Errors set:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMore = () => {
    if (foodItems.length >= maxItems) return;
    setFoodItems([
      ...foodItems,
      { id: foodItems.length + 1, type: "", quantity: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions
    setSubmitting(true); // Disable further submissions

    if (!validateForm()) {
      setSubmissionStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setSubmitting(false); // Re-enable on validation failure
      return;
    }

    const validFoodItems = foodItems.filter(
      (item) => item.type.trim() && item.quantity.trim() && !isNaN(parseInt(item.quantity))
    );
    const formattedFoodItems = validFoodItems.map((item) => ({
      type: item.type,
      quantity: parseInt(item.quantity) || 0,
    }));
    console.log("Formatted food items for submission:", formattedFoodItems);
    if (formattedFoodItems.length === 0) {
      setSubmissionStatus({
        type: "error",
        message: "No valid food items to donate.",
      });
      setSubmitting(false); // Re-enable on no valid items
      return;
    }

    const donationData = {
      name,
      date: selectedDate,
      message,
      foodItems: formattedFoodItems,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/donate", donationData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        setSubmissionStatus({
          type: "success",
          message: `Donation submitted successfully! Food items: ${formattedFoodItems
            .map((item) => `${item.type} (${item.quantity})`)
            .join(", ")}. You can now add more food items.`,
        });
        setFoodItems([{ id: 1, type: "", quantity: "" }]);
        setSelectedDate("");
        setName("");
        setMessage("");
        setErrors({});
        e.target.reset();
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error submitting donation:", error.response?.data || error.message);
      setSubmissionStatus({
        type: "error",
        message: `Error submitting donation: ${error.response?.data?.message || error.message}`,
      });
    } finally {
      setSubmitting(false); // Re-enable after request completes (success or failure)
    }
  };

  return (
    <div className="donate-food-page">
      <h2 className="donate-title">Donate Food</h2>
      {submissionStatus && (
        <Alert
          variant={submissionStatus.type === "success" ? "success" : "danger"}
          className="mt-3"
        >
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
                  setErrors((prev) => ({ ...prev, name: "" }));
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
              <Form.Label>Food Type</Form.Label>
              <Form.Select
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                aria-describedby="food-type-error"
              >
                <option value="Fresh Food">Fresh Food</option>
                <option value="Dry Food">Dry Food</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Day Food was Made</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                aria-describedby="date-error"
              />
              {selectedDate && (
                <p>Selected Date: {formatDisplayDate(selectedDate)}</p>
              )}
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
                    onChange={(e) => handleChange(item.id, "type", e.target.value)}
                    aria-describedby={`food-type-error-${item.id}`}
                    className="mb-1"
                  />
                  {errors[`foodItems.${item.id}.type`] && (
                    <p
                      id={`food-type-error-${item.id}`}
                      className="text-danger mb-0"
                    >
                      {errors[`foodItems.${item.id}.type`]}
                    </p>
                  )}
                </Col>
                <Col md={4} className="d-flex flex-column">
                  <Form.Control
                    type="number"
                    placeholder="Quantity (for approximately how many people)"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(item.id, "quantity", e.target.value)
                    }
                    aria-describedby={`food-quantity-error-${item.id}`}
                    className="mb-1"
                  />
                  {errors[`foodItems.${item.id}.quantity`] && (
                    <p
                      id={`food-quantity-error-${item.id}`}
                      className="text-danger mb-0"
                    >
                      {errors[`foodItems.${item.id}.quantity`]}
                    </p>
                  )}
                </Col>
                <Col md={2}></Col>
                <Col md={2} className="d-flex align-items-center justify-content-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      setFoodItems(foodItems.filter((i) => i.id !== item.id))
                    }
                    aria-label={`Remove food item ${index + 1}`}
                  >
                    ×
                  </Button>
                </Col>
              </Row>
            ))}
            {foodItems.length >= maxItems && (
              <Alert variant="warning" className="mt-3">
                You have reached the maximum limit of {maxItems} food items. Please
                submit again to donate more food. Thank you for your cooperation.
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
            <Button variant="warning" className="w-100 mb-2" aria-label="View gallery">
              From Gallery
            </Button>
            <div className="motivation-box">
              <div className="motivation-icon-placeholder"></div>
              <p>
                You’re doing great work!<br />Taking a step toward a world where no food
                goes to waste.
              </p>
            </div>
          </Col>
        </Row>

        <Button
          variant="warning"
          type="submit"
          className="w-25 mt-3"
          disabled={submitting} // Disable button while submitting
          aria-label="Submit donation"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DonateFood;