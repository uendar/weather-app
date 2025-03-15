# Frontend Application

## 📌 Overview

This is the frontend application for the weather forecasting system. It provides users with real-time weather data, user-generated forecasts, and historical temperature visualizations. The application is built using **React (TypeScript)** and utilizes **Mantine UI** for styling and components.

## 🚀 Features

- **Weather Widget**: Displays real-time weather data and user forecasts.
- **Forecast Management**: Create, update, and delete forecasts.
- **Temperature Visualization**: Graphical representation of historical and predicted temperatures.
- **API Integration**: Fetches data from the backend via REST APIs.
- **State Management**: Uses React Context API for city selection and API refetch triggers.
- **Table Management**: Utilizes `mantine-react-table` for better UI/UX.

## 🛠️ Tech Stack

- **React (TypeScript)**: UI framework
- **Mantine UI**: Component library
- **TanStack React Query**: API data fetching and caching
- **Axios**: HTTP client
- **Recharts**: Graphs and charts

## 📂 Project Structure

```
frontend/
│-- src/
│   │-- components/
│   │-- context/
│   │-- hooks/
│   │-- api/
│   │-- styles/
│   │-- App.tsx
│-- public/
│-- .env
│-- package.json
│-- README.md
```

## 🏗️ Setup & Installation

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **Yarn** or **npm**

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/uendar/weather-app.git
cd frontend
```

### 3️⃣ Install Dependencies

```sh
yarn install
# OR
npm install
```

### 4️⃣ Environment Variables

Create a `.env` file in the root directory and configure the following:

```sh
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_IPGEO_API_KEY=your_api_key
```

### 5️⃣ Start Development Server

```sh
yarn start
# OR
npm start
```

## 🐳 Docker Setup

To run the frontend inside a Docker container:

### 1️⃣ Build the Docker Image

```sh
docker build -t weather-frontend .
```

### 2️⃣ Run the Container

```sh
docker run -p 3000:3000 weather-frontend
```

## 📝 API Endpoints

The application interacts with the following backend endpoints:

### 🔹 Weather API

- `GET /weather/{city}` - Fetches real-time weather data and user forecast

### 🔹 Forecast API

- `GET /forecasts?city={city}` - Fetches forecasts for a city
- `POST /forecasts` - Creates a new forecast
- `PUT /forecasts/{id}` - Updates an existing forecast
- `DELETE /forecasts/{id}` - Deletes a forecast

### 🔹 Temperature API

- `GET /temperature/{city}?days={n}` - Fetches historical temperature data
- `GET /temperature/{city}/download` - Downloads temperature data as CSV



