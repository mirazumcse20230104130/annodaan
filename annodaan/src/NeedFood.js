import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert, Table } from "react-bootstrap"; // Removed unused Row and Col
import axios from "axios";
import "./NeedFood.css"; // Import the new CSS file

const NeedFood = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonations, setSelectedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donate");
        setDonations(response.data);
      } catch (err) {
        setError("Failed to fetch donations. Please try again later.");
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const handleSelect = (donationId) => {
    setSelectedDonations((prev) =>
      prev.includes(donationId)
        ? prev.filter((id) => id !== donationId)
        : [...prev, donationId]
    );
  };

  const handleChoose = () => {
    if (selectedDonations.length === 0) {
      setError("Please select at least one donation to proceed.");
      return;
    }
    // Placeholder for choosing action
    setError(`Selected ${selectedDonations.length} donation(s). Implement backend logic here.`);
    setSelectedDonations([]); // Clear selection
  };

  return (
    <div className="need-food-page">
      <h2 className="need-title">Need Food</h2>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {loading ? (
        <p>Loading donations...</p>
      ) : (
        <>
          {donations.length === 0 ? (
            <p>No donations available at the moment.</p>
          ) : (
            <div>
              <Table striped bordered hover className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Donor Name</th>
                    <th>Date</th>
                    <th>Message</th>
                    <th>Food Items</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation, index) => (
                    <tr key={donation._id}>
                      <td>{index + 1}</td>
                      <td>{donation.name}</td>
                      <td>{donation.date}</td>
                      <td>{donation.message || "N/A"}</td>
                      <td>
                        {donation.foodItems.map((item, idx) => (
                          <div key={idx}>
                            {item.type} - {item.quantity} person(s)
                          </div>
                        ))}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedDonations.includes(donation._id)}
                          onChange={() => handleSelect(donation._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="button-container">
                <Button
                  variant="warning"
                  onClick={handleChoose}
                  className="mt-3"
                  aria-label="Choose selected donations"
                >
                  Choose Selected Donations
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NeedFood;