# Excel File Validator

The **Excel File Validator** is a web application designed to validate and store data from Excel files into a MongoDB database. The application supports file uploads, schema validation, and data visualization in a tabular format.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Upload two Excel files.
- Validate data against predefined schemas.
- Store valid data in a MongoDB database.
- Display validated data in a tabular format.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/excel-file-validator.git
    cd excel-file-validator
    ```

2. Install server dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Install client dependencies:

    ```bash
    cd frontend
    npm install
    ```

4. Start MongoDB server:

    Ensure your MongoDB server is running. You can use a local instance or a cloud-based instance like MongoDB Atlas.

## Usage

### Starting the Server

1. Navigate to the `server` directory:

    ```bash
    cd backend
    ```

2. Create a `.env` file with the following content:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```

3. Start the server:

    ```bash
    node server.js
    ```

### Starting the Client

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Start the client:

    ```bash
    npm run dev
    ```

3. Open your browser and go to `http://localhost:5173` to access the application.
