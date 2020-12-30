# Use NodeJS base image
FROM node:13 as current_build

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

FROM node:13

COPY --from=current_build /usr/src/app/www /usr/src/app/www

COPY --from=current_build /usr/src/app/healthy /tmp/healthy

# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["npm", "run", "prod"]
