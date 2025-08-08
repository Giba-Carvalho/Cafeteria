#!/bin/bash

# Install dependencies
npm install

# Run database migrations and seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

echo "Build completed successfully!"
