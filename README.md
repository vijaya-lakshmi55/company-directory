# Company Directory

A modern and responsive company directory application built using React, Vite, and Tailwind CSS. The application displays company information in clean card and table layouts with reusable components and centralized state management.

---

## Project Flow

The project follows a simple and scalable frontend architecture.

### 1. Static JSON Data Source

Company data is maintained inside a centralized JSON file.

Example fields:

- Company Name
- Logo
- Industry
- Location
- Description
- Website
- Status

Using a JSON-based structure helped keep the data modular, reusable, and easy to scale without hardcoding values directly inside components.

---

### 2. Context API for Global State Management

React Context API was used to manage and share company data across components.

The context acts as a centralized data layer:

- Stores company data
- Provides data to Grid View and Table View
- Avoids prop drilling
- Improves component reusability
- Makes future API integration easier

This approach creates a cleaner architecture compared to passing props through multiple component levels.

---

### 3. Component-Based Architecture

The UI was divided into reusable components:

- Navbar
- Search Section
- Grid Cards
- Table View
- Company Badge
- Status Indicators

Benefits:

- Better maintainability
- Reusable UI structure
- Easier debugging
- Scalable frontend design

---

### 4. Responsive UI with Tailwind CSS

Tailwind CSS was used for styling to achieve:

- Responsive layouts
- Consistent spacing
- Faster UI development
- Modern design system
- Utility-first styling approach

Soft gray backgrounds and elevated white cards were used to improve visual hierarchy and card highlighting.

---

### 5. Grid and Table View Switching

The application supports dynamic layout switching between:

- Card/Grid View
- Table/List View

This improves user experience depending on how users prefer to browse company data.

---

### 6. Optimized Frontend Performance

The project uses Vite for faster development and optimized builds.

Advantages:

- Fast hot reload
- Lightweight bundling
- Better development experience
- Optimized production build

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Context API

---

## Future Improvements

- Backend API integration
- Pagination
- Authentication
- Real-time search
- Sorting & filtering
- Database integration
- Dark mode support

---

## Author

Vijaya
