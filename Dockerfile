# Use the official lightweight Node.js 18 image.
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm i --only=production

# Copy local code to the container image.
COPY . .

# Copy .env file
COPY .env .

# Build the Next.js app
RUN npm run build

# Run the web service on container startup.
CMD ["npm", "start"]