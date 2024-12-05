import React from 'react';

// Define the type for props if needed
type HomePageProps = {
  title: string;
  description?: string; // Optional prop
};

const HomePage: React.FC<HomePageProps> = ({ title, description }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

// Default props for the component
HomePage.defaultProps = {
  title: 'Welcome to the Home Page',
  description: 'This is a basic TypeScript setup in Next.js!',
};

export default HomePage;
