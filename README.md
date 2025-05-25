# The State Statutes Project

A comprehensive web application for exploring and analyzing state statutes across the United States. This project combines advanced natural language processing with expert legal analysis to provide insights into state-level legislation.

## Project Structure

### Web Application (`state-statutes-web/`)
The React-based web application that serves as the frontend for the project.

#### Key Components:
- `src/components/`
  - `Navbar.tsx`: Main navigation component with links to all major sections
- `src/pages/`
  - `Home.tsx`: Landing page with project overview and featured content
  - `About.tsx`: Project background, team information, and motivation
  - `Explore.tsx`: Interactive data exploration interface with search and visualization
  - `Methodology.tsx`: Detailed explanation of data collection and annotation process
  - `CaseStudies.tsx`: In-depth analysis of specific statute types
  - `Collaborate.tsx`: Collaboration form and partnership opportunities
  - `Publications.tsx`: Research papers, media coverage, and related resources
- `src/theme.ts`: Chakra UI theme configuration
- `src/App.tsx`: Main application component with routing setup

### Data Processing (`data_processing/`)
Scripts and tools for processing and analyzing state statute data.

### Database (`db/`)
Database schema and migration files for storing state statute data.

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd state-statutes-db
```

2. Install dependencies for the web application:
```bash
cd state-statutes-web
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build locally

## Technology Stack

- **Frontend**: React, TypeScript, Chakra UI
- **Data Visualization**: Recharts
- **Routing**: React Router
- **Build Tool**: Vite
- **Development**: ESLint, TypeScript

## Contributing

We welcome contributions to The State Statutes Project! Please see the [Collaborate](http://localhost:5173/collaborate) page for more information on how to get involved.

## License

[Add license information here]

