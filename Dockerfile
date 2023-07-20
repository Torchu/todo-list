FROM node:lts-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Run the application
CMD ["npm", "run", "dev"]