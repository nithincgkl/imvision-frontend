'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./style.module.css";

interface EventCategory {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
}

const WowMoments: React.FC = () => {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API
  useEffect(() => {
    const fetchEventCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}event-categories?populate=*`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        const data = response.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          thumbnailUrl: `${item.thumbnail?.url}`,
        }));
        setCategories(data);
      } catch (error) {
        console.error('Error fetching event categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventCategories();
  }, []);

  return (
    <>
      <section className={styles['home-wow']}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h4>Perfect For</h4>
              <h3 className="mb-0">Create a WOW Moment</h3>
              <p className={styles['home-wow-p']}>
                <span>The result? A face cushion that fits you perfectly.</span><br />
                Enhanced immersion with no more light leakage, and comfortable to wear for hours.
              </p>
            </div>
          </div>
          <div className="row">
            {/* Show loading indicator */}
            {loading ? (
              <div className="col-md-12 text-center">
                <p>Loading...</p>
              </div>
            ) : (
              // Map categories into UI elements
              categories.map((category) => (
                <div className="col-md-6" key={category.id}>
                  <div className={styles['wow-box']}>
                    <img
                      src={category.thumbnailUrl}
                      className="w-100"
                      alt={category.title}
                    />
                    <h4>{category.title}</h4>
                    <p>{category.description}</p>
                  </div>
                </div>
              ))
            )}
            <div className="col-md-12 text-center">
              <button>Know More Details</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WowMoments;
