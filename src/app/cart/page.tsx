'use client';
import React, { useState } from 'react';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    newsletter: false,
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            Subscribe to our newsletter
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" disabled={!formData.terms}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
