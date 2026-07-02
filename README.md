# Product CRUD Application (MERN Stack)

A full-stack product management application built with **MongoDB, Express.js, React.js, and Node.js**.

## Overview

This project is a Product Management Application developed using the MERN Stack. It allows users to manage software products by performing **Create, Read, Update, and Delete (CRUD)** operations through a clean and responsive user interface.

The application follows a **client-server architecture**, where the React frontend communicates with the Express backend using REST APIs, and all product information is stored in MongoDB.

## Tech Stack

**Frontend:** React.js, Vite, Axios, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB, Mongoose

## Features Implemented

### Product Management
- Add a new software product
- View all products
- Edit existing product details
- Delete products with confirmation

### Smart Product Entry
- Product name suggestions while typing
- Automatic category and description filling for supported software products
- Price placeholder based on the selected product

### Search & Filtering
- Search products by name
- Filter products using category dropdown
- Sort products by:
  - Name (A–Z)
  - Price (Low → High)
  - Price (High → Low)

### User Interface
- Responsive layout
- Product cards displaying all details
- Clean form validation
- Success and error notifications
- Loading indicator while fetching data

## Project Structure

```
Product-CRUD-MERN/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Backend Implementation

The backend is built using Express.js and follows REST API principles.

**Database:** MongoDB stores all product information, with Mongoose used for schema creation and database operations.

### API Endpoints

- **GET** `/products` — Fetch all products
- **POST** `/products` — Create a new product
- **PUT** `/products/:id` — Update an existing product
- **DELETE** `/products/:id` — Delete a product

The backend handles:
- Database connection
- CRUD operations
- Request validation
- Error handling
- JSON responses

## Frontend Implementation

The frontend is developed using React with functional components and Hooks.

### React Hooks Used

- **useState** — Manage application state
- **useEffect** — Fetch product data
- **useMemo** — Optimize filtering and sorting

**API Communication:** Axios is used to communicate with the backend REST APIs.

### UI Functionalities
- Product form for Create and Update operations
- Dynamic search functionality
- Category filtering
- Product sorting
- Automatic product suggestions
- Responsive product listing

## Database Schema

- **name** — Software product name
- **price** — Product price
- **category** — Software category
- **description** — Product description

## Installation

### Backend
```
cd backend
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

### Frontend
```
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## Environment Variables

Create a `.env` file inside the **frontend**:
```
VITE_API_URL=http://localhost:5000
```

Create a `.env` file inside the **backend**:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Key Highlights
- Full MERN Stack implementation
- RESTful API architecture
- MongoDB database integration
- Dynamic React interface
- Responsive design
- Search, filter, and sorting functionality
- Smart product suggestions with auto-filled details
- Clean and reusable component structure
- Easy to extend with additional product categories

## Future Improvements
- Product image upload
- User authentication
- Pagination
- Advanced filtering
- Dashboard analytics
- Product export (CSV/PDF)

## Conclusion

This project demonstrates a complete implementation of CRUD operations using the MERN stack. It provides an intuitive interface for managing software products while following modern web development practices such as REST APIs, component-based architecture, responsive UI design, and efficient state management.
