# CompIQ - Payroll Management System

I have used Gemini CLI tool to make this documentation

CompIQ is a web application for managing employee payrolls. It provides functionalities for user authentication, payroll processing, and anomaly detection.

## Features

*   **User Authentication:** Secure user registration and login system.
*   **Payroll Management:**
    *   Create, Read, Update, and Delete (CRUD) payroll records.
    *   View a list of all payrolls.
*   **Net Pay Calculator:** Calculate net pay based on salary, bonus, taxes, and deductions.
*   **Payroll Anomaly Detection:** Identify and view potential anomalies in payroll data.
*   **Protected Routes:** Secure access to the payroll management dashboard.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/shagun199/compiq-frontend.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd compiq-frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the development server:
    ```sh
    npm start
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

The application requires a running backend server. Make sure the backend server is running on `http://localhost:8080`.

## Available Scripts

In the project directory, you can run:

*   `npm start`: Runs the app in the development mode.
*   `npm test`: Launches the test runner in the interactive watch mode.
*   `npm run build`: Builds the app for production to the `build` folder.
*   `npm run eject`: Ejects the app from Create React App.

## Technologies Used

*   [React](https://reactjs.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [React Router](https://reactrouter.com/)
*   [Axios](https://axios-http.com/)