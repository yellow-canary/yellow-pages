# Yellow Pages - A Service Mesh Catalog

A web application designed to serve as a comprehensive catalog for application services within a service mesh environment. It allows users to register, join teams, and manage services. The application features a role-based access system, granting administrators extended privileges to manage users and teams effectively.

## Features

-   **Service Catalog:** View, search, and manage a list of all application services.
-   **User Authentication:** Simple login and registration system with mock data.
-   **Team Management:** Create and manage teams, and assign users to them.
-   **Role-Based Access Control:** Differentiates between 'Admin' and 'User' roles with distinct permissions.
-   **Detailed Views:** Drill down into specific services, teams, and users for more information.
-   **Admin Dashboard:** A dedicated interface for admins to manage all users and teams in the system.
-   **Profile Settings:** Users can update their profile information, such as their username and team assignment.
-   **Theme Switching:** Instantly toggle between a light and dark mode to suit your preference.

## Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **State Management:** React Context API

## Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
-   An active internet connection is required to load external scripts like React and Tailwind CSS from the CDN.

## Getting Started

This application is a client-side-only project and is designed to run directly in the browser without a complex build step.

### Installation

1.  **Download the project files:**
    Ensure you have all the project files (`index.html`, `index.tsx`, `App.tsx`, etc.) in a single directory on your local machine.

2.  **Set up the API Key (if applicable):**
    If the application integrates with external APIs like the Gemini API, it is configured to read the necessary API key from an environment variable `process.env.API_KEY`. You must ensure this variable is available in the execution environment where you are serving the files.

### Running the Application

There are two primary ways to run this application:

#### 1. Directly in the Browser (Simple Method)

The simplest way to run the application is to locate the `index.html` file in your project directory and open it directly with your preferred web browser.

#### 2. Using a Local Web Server (Recommended)

For a more robust experience that avoids potential browser security issues (like CORS problems), it's recommended to serve the project directory using a simple local web server.

**If you have Python installed:**
Open your terminal, navigate to the project's root directory, and run one of the following commands:

```bash
# For Python 3
python -m http.server

# For Python 2
python -m SimpleHTTPServer
```
Then, open your browser and navigate to `http://localhost:8000`.

**If you have Node.js and `serve` installed:**
If you don't have `serve`, you can install it globally: `npm install -g serve`.
Then, open your terminal, navigate to the project's root directory, and run:

```bash
serve .
```
Open your browser and navigate to the local URL provided by the `serve` command.

## How to Use

-   **Register/Login:** Start by registering a new user or logging in as one of the pre-configured mock users.
    -   **Admin Access:** Log in as `Alice`.
    -   **User Access:** Log in as `Bob`.
-   **Explore the Catalog:** Browse and search the list of services.
-   **Admin Management:** If logged in as an Admin (`Alice`), navigate to the **Management** tab to manage users and teams.
-   **Settings:** Access the **Settings** tab to update your profile or change the application's visual theme.
