# SangamAuthTaskProject
Usage
Register

    Users can register by providing a valid email and password.

Login

    After registration, users can log in using their credentials.
    Upon successful login, a token is generated and stored in local storage.

Dashboard

    Once logged in, users can access their dashboard.
    The dashboard displays the user's task list.
    Users can perform CRUD operations on their tasks (add, edit, delete).

Logout

    Users can log out, which clears the token from local storage.
    To access the dashboard again, users need to log in and obtain a new token.

Technologies Used

    HTML5, CSS, for the frontend
    JavaScript for frontend logic
    Node.js and Express for the backend
    MongoDB for storing user data and tasks
    JSON Web Tokens (JWT) for authentication
