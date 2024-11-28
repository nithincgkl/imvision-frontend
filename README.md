# Imvision Frontend

This is the frontend of the Imvision application, built using Next.js. The project serves as the user interface for interacting with the Imvision backend API.  

## Features

- **Next.js Framework**: Leverages the power of server-side rendering (SSR) for better performance and SEO.
- **Environment Configuration**: Easily configurable with .env variables for API connectivity.
- **API Integration**: Connects seamlessly with the backend API for data fetching and user interaction.
- **Scalable Architecture**: Designed with scalability and maintainability in mind.

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14 or later)
- npm or yarn package manager

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nithincgkl/imvision-frontend.git
cd imvision-frontend
```

### 2. Install Dependencies

Use npm or yarn to install project dependencies:

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```
NEXT_PUBLIC_API_URL=<your-api-url>
NEXT_PUBLIC_API_TOKEN=<your-api-token>
```

Replace `<your-api-url>` and `<your-api-token>` with the actual API URL and token provided by the backend team.

## Running the Project

### Development Mode

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000.

### Production Build

To build the application for production:

```bash
npm run build
# or
yarn build
```

To serve the production build locally:

```bash
npm run start
# or
yarn start
```

## File Structure

```
imvision-frontend/
├── components/       # Reusable components
├── pages/            # Next.js pages
├── public/           # Static assets
├── styles/           # CSS and styling files
├── .env.local        # Environment variables (not included in the repo)
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```
