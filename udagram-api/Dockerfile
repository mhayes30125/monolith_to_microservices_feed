# Use NodeJS base image
FROM node:13 as current_build

ARG ARG_POSTGRES_USERNAME
ARG ARG_POSTGRES_PASSWORD
ARG ARG_POSTGRES_DATABASE
ARG ARG_POSTGRES_HOST
ARG ARG_JWT_SECRET

ENV POSTGRES_USERNAME=$ARG_POSTGRES_USERNAME
ENV POSTGRES_PASSWORD=$ARG_POSTGRES_PASSWORD
ENV POSTGRES_DATABASE=$ARG_POSTGRES_DATABASE
ENV POSTGRES_HOST=$ARG_POSTGRES_HOST
ENV JWT_SECRET=$ARG_JWT_SECRET

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

COPY healthy ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

RUN npm run build

# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["npm", "run", "prod"]
