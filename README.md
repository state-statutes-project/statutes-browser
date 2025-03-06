# State Statutes Browser Frontend

This is a React frontend application for browsing state statutes. It connects to a backend API that serves statute data from a MongoDB database.

## Features

- Browse statutes with sorting and filtering
- Filter by state and tags
- Search statutes by keyword
- View detailed statute information
- Pagination for handling large datasets
- Responsive design for mobile and desktop

## Setup Instructions

### Prerequisites

- Node.js v14+ and npm
- A running backend API (Express.js)

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/statutes-browser.git
   cd statutes-browser
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update the API URL in `src/services/api.js` to point to your backend server.

4. Start the development server:
   ```
   npm start
   ```

### Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/statutes-browser"
   ```

2. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

3. Your application will be available at `https://yourusername.github.io/statutes-browser`

## Project Structure

- `src/App.js` - Main component and routing setup
- `src/services/api.js` - API service for backend communication
- `src/components/` - React components:
  - `Header.js` - Navigation header
  - `StatutesList.js` - List view with filtering
  - `StatuteDetail.js` - Detailed view of a single statute

## Backend Connection

This frontend is designed to work with the Express.js backend API. Make sure your backend provides these endpoints:

- `GET /api/statutes` - List statutes with filtering and pagination
- `GET /api/statutes/:id` - Get a specific statute by ID
- `GET /api/states` - List available states
- `GET /api/tags` - List available tags

## Customization

- Update the theme in `src/App.js` to change colors and typography
- Modify the filtering options in `src/components/StatutesList.js`
- Add additional routes and components as needed

## License

This project is open source and available under the MIT License.