# Use an official Node.js runtime as a parent image
FROM node:20.10.0-alpine

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the compiled JavaScript files to the working directory
COPY dist/ .

# Expose the port your app runs on
EXPOSE 7000

# Command to run the application
CMD ["npm", "start"]
