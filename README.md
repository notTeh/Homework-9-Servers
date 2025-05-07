# Homework 9: Servers

A web server implementation created for the Homework 9 assignment. This project demonstrates client-server architecture using TypeScript for the backend logic with a styled frontend interface.

## Overview

This application implements server functionality with a responsive web interface. The project uses TypeScript for type-safe server-side logic while leveraging CSS for styling the user interface.

## Technology Stack

- **Frontend**:
  - HTML (5%)
  - CSS (56.4%) - Primary styling
  - JavaScript (0.6%)

- **Backend**:
  - TypeScript (38%) - Server implementation

## Features

- Server-side data processing
- RESTful API endpoints
- Interactive web interface
- Responsive design

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/notTeh/Homework-9-Servers.git
   cd Homework-9-Servers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access the application by navigating to:
```
http://localhost:3000
```

## Project Structure

```
Homework-9-Servers/
├── src/                # Source files
│   ├── server/         # Server-side TypeScript code
│   ├── client/         # Client-side code
│   │   ├── css/        # Stylesheet files
│   │   ├── js/         # JavaScript files
│   │   └── index.html  # Main HTML file
├── public/             # Static assets
├── dist/               # Compiled TypeScript output
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## Development

To run the server in development mode with auto-reload:

```bash
npm run dev
```

## Testing

Run the test suite with:

```bash
npm test
```

## Assignment Requirements

- [x] Implement a web server using TypeScript
- [x] Create RESTful API endpoints
- [x] Develop a responsive frontend interface
- [x] Handle server requests and responses
- [x] Document code and API endpoints

## License

This project is submitted as academic coursework and is not licensed for distribution.

## Author

- [notTeh](https://github.com/notTeh)
