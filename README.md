# BCard

BCard is a React-based web application that allows users to create and manage digital business cards. It also enables users to like and save business cards created by others.

## Features

- **Business Card Creation:** Business users can create their own business cards.
- **Business Card Management:** Each business card has its own information page which can be accessed from the card.
- **User Types:** 
  - **Personal Users:** Can only view and save business cards.
  - **Business Users:** Can create, view, and manage their own business cards.
- **Responsive Design:** The website uses Bootstrap and React-Bootstrap for a responsive and user-friendly design.
- **CRUD Operations:** The application includes modals for clean and simple access to create, read, update, and delete (CRUD) actions.
- **Adaptive Alerts:** The website uses the React-Toastify library for adaptive alerts.
- **Form Validation:** Frontend form validation is performed using Formik and Yup, ensuring compliance with server-side documentation to minimize unnecessary requests.
- **Authentication and Authorization:** The website is designed to prevent unauthorized access to pages and server requests through token management in session storage and an auth hook for necessary pages.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Bootstrap:** A CSS framework for responsive and mobile-first design.
- **React-Bootstrap:** Bootstrap components built with React.
- **React-Toastify:** A library for notifications in React applications.
- **Formik:** A library for building forms in React.
- **Yup:** A JavaScript schema builder for value parsing and validation.

## Getting Started

To get started with BCard, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bcard.git
2. **Install dependencies:**
   ```bash
   cd bcard
    npm install

1. **Run the application:**
   ```bash
       npm start
