# Report Configuration Application

## Overview
This is a web application for configuring form parameters dynamically based on a backend form_definition end point and a mongo DB data base. The app is built using **React**, **Material-UI**, **Python (Flask)**, and **MongoDB**.

## Features
- Dynamically generated forms based on backend definitions.
- Frontend validation for required fields, date ranges, and types.
- Integration with MongoDB to store configurations.

---

## Prerequisites
### Backend
1. Python 3.x installed.
2. MongoDB installed and running.

### Frontend
1. Node.js (16.x or higher) and npm installed.

---


# Backend Setup:
1. Navigate to the backend folder:
    cd backend
2. Create a Python virtual environment:
    on mac\linux:
        python3 -m venv venv
        source venv/bin/activate
    on windows:
        python -m venv venv
        venv\Scripts\activate
3. Install dependencies using pip:
    pip install -r requirements.txt

4. run:
    python3 app.py 


# Frontend Setup:
1. Navigate to the frontend folder:
    cd frontend
2. Install dependencies:
    npm install

3. Start the React development server:
    npm run dev




### Note:
This project uses **Vite** as the build tool for the frontend instead of `create-react-app`. Vite provides faster builds and an optimized development server. As a result, the command to start the development server is: 
    npm run dev

The app will be available at the URL provided in the terminal (e.g., http://127.0.0.1:5173).


# How to Use the Application:
    1. Open the frontend in your browser: http://127.0.0.1:5173.
    2. The app will dynamically load the form based on the backend. 
       there is an option to change the form definition parameters in the app.py file (just passing any other array of form parameter at the function insert_many())
    3. Fill out the form and Submit the form by clicking the "Save" button.Check the console or MongoDB for saved configurations.

    I used mongoDB compasse in order to check that the data save seccusesfully to the mongo DB data base.
 
