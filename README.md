# BCard

BCard is a React-based web application that allows users to create and manage digital business cards. It also enables users to like and save business cards created by others.

## Features
- **Business:**
  - **Business Card Creation:** Businesses cards can  be create with modal for quick simple access.
  - **Business Card Management:**
    - **Like Card:** all cards can be liked to add them to favorites cards, and unlike them for removal.
    - **Edit And Delete:**   Busniessess cards can be edited and deleted with modal usage.
- **User Types:** 
  - **Personal Users:** Can only view and save business cards.
  - **Business Users:** Can create, view, and manage their own business cards.
- **Responsive Design:** The website uses Bootstrap and React-Bootstrap for a responsive and user-friendly design.
- **CRUD Operations:** The application includes modals for clean and simple access to create, read, update, and delete (CRUD) actions for both user and cards actions.
- **Adaptive Alerts:** The website uses the React-Toastify library for adaptive alerts.
- **Form Validation:** Frontend forms validation is performed using Formik and Yup, ensuring compliance with server-side documentation to minimize unnecessary requests.
- **Authentication and Authorization:** The website is designed to prevent unauthorized access to pages and server requests through token management in session storage and an auth hook for necessary pages.
- **Search Bar:**
  - The header of the site includes a search bar, which allows users to search for businesses by their title from any page of the site.
  - Upon typing, the user is automatically transferred to the All Cards page while seeing the matching cards.
  - The cards filter live according to the search value.
  - Upon moving to a different page, the search is cleared.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GuyHasan/ReactClient_BCard.git
cd ReactClient_BCard
```

### 2. Install Dependencies

Make sure you have Node.js (v14 or later) installed, then run:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following content:

```dotenv
VITE_API_URL=http://localhost:8181
```

This variable will be used to configure API requests in the frontend. Access it in your code via:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### 4. Run the Development Server

```bash
npm run dev
```

Your app should now be available at [http://localhost:5173](http://localhost:5173).

---

## Backend Integration

This React client is designed to work seamlessly with the [NodeJsServer_BCard](https://github.com/GuyHasan/NodeJsServer_BCard) backend. Configure the API URL in your `.env` file:

```dotenv
VITE_API_URL=http://localhost:8181
```

The backend handles users, cards, and authentication . Refer to the NodeJsServer_BCard README for full backend setup and API route details.

---

## Web Pages

### Home
The homepage provides an overview of the BCard platform and highlights its key features. It includes a welcoming message and a brief introduction to the application's purpose.

### About
The About page contains information about BCard, its mission, and the team behind the project. This page aims to give users insight into the platform's goals and the people who built it.

### All Cards
The All Cards page displays a collection of all the business cards created by users on the platform. Users can browse, search, and view business cards, and like them to save them to their favorites. can be access only from home page.

### My Cards
The My Cards page is accessible only to business users and displays all the business cards they have created. Users can manage their cards, including editing and deleting them. can be access only as logged in business user.

### Favorite Cards
The Favorite Cards page lists all the business cards that a user has liked and saved. It provides quick access to their favorite cards for easy viewing. can be access only as logged in user(either personal or business). 

### Profile
The Profile page allows users to view and edit their personal information, such as their name, email, and profile picture. can be access only as logged in user(either personal or business).  

### Login
The Login page enables users to sign in to their accounts using their credentials. It includes fields for entering their email and password, and options for resetting their password if needed. cannot be access while logged in.

### Register
The Register page allows new users to create an account on the BCard platform. It includes fields for entering their personal information, such as name, email, and password, as well as selecting their user type (personal or business). cannot be access while logged in.

---

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Bootstrap:** A CSS framework for responsive and mobile-first design.
- **React-Bootstrap:** Bootstrap components built with React.
- **React-Toastify:** A library for notifications in React applications.
- **Formik:** A library for building forms in React.
- **Yup:** A JavaScript schema builder for value parsing and validation.
- **React Router DOM:** A library for routing in React applications.
- **jwt-decode:** A library for decoding JSON Web Tokens (JWT).
- **Axios:** A library for making HTTP requests.

## Token
- **User Login Management:** 
  - Performed with the received token from the server-side.
  - Saved in session storage (not local) for optimal user security.
  - Can be erased manually simply by using the logout button in the navbar.


