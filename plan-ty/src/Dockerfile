# Use the official Node.js 16.10-alpine image as the base
# Get the node version by inputting in the terminal node -v command
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app


# Copy package.json and package-lock.json first
COPY package *.json .

# Build the app
RUN npm install

# Copy the rest of the application files
COPY ..

# Expose 
EXPOSE 3000

# Run the command to start the app
CMD ["npm", "start"]