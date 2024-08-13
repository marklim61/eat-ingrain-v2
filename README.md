# Ingrain E-Commerce Website

A Vite + React application for a small food popup business.

## Installation

1. Clone the repository
	```bash
	git clone https://github.com/marklim61/eat-ingrain-v2.git

########################### FRONTEND ###########################

## Features 

- Interactive and responsive design
- 4 main pages (About, Events, Shop, Contact)
- Product listing page
- Product detail page
- Shopping cart functionality
- Integration with Square payment gateway


a. Navigate to the project directory 
	cd eat-ingrain-client

b. Install dependencies
	npm install
	
	Following dependencies needed to be installed:

	- tailwindcss using installation guide for Vite
	- tailwindcss/typography
	- daisyui
	- react-router-dom
	- fontawesome
	- react-tooltip
	- email.js
	- axios

c. Start the development app
	npm run dev

########################### BACKEND ###########################

## Features

- RESTful API endpoints for product management
- Integration with Square payment gateway
- User authentication (if applicable)
- Order management and tracking

a. Navigate to the project directory
	cd server

b. Install dependencies
	npm install express cors dotenv square nodemon

c. Update the package.json from the server:

"scripts": {
    "devStart": "nodemon server.js"
  },

d. Start the development server
	npm run devStart
