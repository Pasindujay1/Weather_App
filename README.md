# Weather Display Application

Welcome to the Weather Display Application for Lucenxia Healthcare (Pvt) Ltd. This project is designed to provide users with current weather information, search for weather details in other cities, and save reminders for weather-related activities.

## Table of Contents

- [Objective](#objective)
- [Use Case](#use-case)
- [Requirements](#requirements)
- [Design Decisions and Technology Choices](#design-decisions-and-technology-choices)
- [Architectural Patterns](#architectural-patterns)
- [Trade-offs and Considerations](#trade-offs-and-considerations)
- [Conclusion](#conclusion)
- [API Documentation](#API-Documentation)
- [Weather App Functionality Demonstration Video](#APP-Demostartion-Video)
- [Setup Instructions](#setup-instructions)

## Objective

The purpose of this assignment is to assess skills and experience in front-end and back-end development, mobile app system architecture, and the ability to design and implement a scalable and efficient system for a Weather Display Application.

## Use Case

- **User**:
  - Search for weather information by city name.
  - View current weather conditions, including temperature, humidity, wind speed, and forecast.
  - Allow location-based weather information display.
  - Save reminders for weather-related activities (e.g., "Bring an umbrella tomorrow").

## Requirements

### Authentication

- Implement user authentication using JWT tokens, OAuth, or a custom mechanism.

### Weather Mobile Application

- Create a visually compelling onboarding and landing page.
- Display current weather details for the user’s location.
- Enable users to search for weather information by city.
- Show a 5-day weather forecast for selected cities.
- Allow users to create, view, edit, and delete reminders.

### API Design

- Integrate with a weather API (e.g., OpenWeatherMap, Weatherstack, or similar).
- Design a RESTful API if additional backend services are required.
- Optionally, implement GraphQL endpoints for queries and mutations related to user actions.

## Design Decisions and Technology Choices

### Frontend Framework: React Native

- **Reason**: React Native allows for building cross-platform mobile applications using JavaScript and React. It provides a rich ecosystem of libraries and tools, enabling efficient development and a consistent user experience across both iOS and Android platforms.
- **Trade-offs**: While React Native offers near-native performance, there might be some performance overhead compared to fully native applications. However, the benefits of code reusability and faster development cycles outweigh this for our use case.

### Backend Framework: Node.js/Express.js

- **Reason**: Node.js with Express.js is a lightweight and efficient framework for building scalable server-side applications. It is well-suited for handling asynchronous operations, which is essential for our application that relies on external APIs for weather data.
- **Trade-offs**: Node.js is single-threaded, which might be a limitation for CPU-intensive tasks. However, for our I/O-bound application, it provides excellent performance and scalability.

### Database: SQLite (via Expo SQLite)

- **Reason**: SQLite is a lightweight, file-based database that is easy to set up and use within a mobile application. It is suitable for storing user reminders locally on the device.
- **Trade-offs**: SQLite is not designed for high-concurrency scenarios, but for our use case of storing user reminders, it is more than sufficient.
- **Reason for Local Storage**: Storing reminders locally reduces the number of API requests, which helps in minimizing server load and ensures that the reminders are accessible even when the user is offline. This approach enhances the app's performance and reliability.

### Weather API: OpenWeatherMap

- **Reason**: OpenWeatherMap provides comprehensive weather data, including current conditions, forecasts, and location-based weather information. It has a straightforward API and offers a free tier suitable for development and testing.
- **Trade-offs**: The free tier has limitations on the number of API calls per minute, which might require optimization or caching strategies in a production environment.

### Authentication: JWT (JSON Web Tokens)

- **Reason**: JWT is a widely-used standard for securely transmitting information between parties as a JSON object. It is stateless and allows for easy integration with mobile applications.
- **Trade-offs**: JWT tokens need to be securely stored on the client side to prevent unauthorized access. We use AsyncStorage in React Native to store the tokens securely.
- **Storage of JWT and Username**: The JWT and username are stored in AsyncStorage to maintain user sessions across app restarts. This allows the app to authenticate users without requiring them to log in every time they open the app, enhancing the user experience.

### Environment Variables: .env File

- **Reason**: Using a `.env` file allows for secure and convenient management of environment-specific configurations such as API keys and URLs. This approach keeps sensitive information out of the source code and makes it easy to switch between different environments (e.g., development, production).
- **Implementation**: The `react-native-dotenv` library is used to load environment variables from the `.env` file. The Babel configuration is updated to include this plugin, ensuring that environment variables are accessible throughout the application.

### Navigation: React Navigation

- **Reason**: React Navigation is a popular library for handling navigation in React Native applications. It provides a flexible and customizable way to manage navigation stacks, drawers, and tabs.
- **Trade-offs**: React Navigation has a learning curve, but its flexibility and community support make it a robust choice for complex navigation scenarios.

### Styling: Custom Themes

- **Reason**: Using custom themes allows for consistent styling across the application. We defined colors and fonts in a centralized theme file to ensure a cohesive look and feel.
- **Trade-offs**: Custom themes require initial setup and maintenance, but they provide a scalable way to manage styles across the application.

## Architectural Patterns

### Component-Based Architecture

- **Reason**: React Native's component-based architecture promotes reusability and separation of concerns. Each screen and UI element is encapsulated in its own component, making the codebase modular and easier to maintain.
- **Trade-offs**: Component-based architecture can lead to a large number of small files, but it improves code organization and readability.

### MVC Pattern

- **Reason**: Backend follows the Model-View-Controller pattern to separate concerns and improve maintainability.


## Middleware for Authentication
- **Reason**: Centralized logic for reusable authentication processes.


### RESTful API Design

- **Reason**: RESTful APIs are stateless and provide a clear structure for interacting with backend services. They are easy to consume from the frontend and integrate well with HTTP methods.
- **Trade-offs**: RESTful APIs can become complex with nested resources, but they provide a standardized way to interact with backend services.

## Trade-offs and Considerations

1. **Performance vs. Development Speed**: 
   - Using React Native and Node.js allows for rapid development and cross-platform compatibility. However, there might be some performance trade-offs compared to fully native applications. The chosen technologies strike a balance between performance and development speed.

2. **Local Storage vs. Remote Database**:
   - Storing reminders locally using SQLite ensures quick access and offline availability. However, it limits the ability to sync data across devices. For this use case, local storage is sufficient, but future enhancements could include remote syncing.

3. **API Rate Limits**:
   - The free tier of OpenWeatherMap has rate limits on API calls. To mitigate this, we can implement caching strategies or upgrade to a paid plan if necessary.

## Conclusion

The chosen technologies and architectural patterns provide a scalable and efficient solution for the Weather Display Application. The design decisions prioritize rapid development, cross-platform compatibility, and a consistent user experience. The trade-offs made are justified by the benefits they bring to the overall system. The use of environment variables through a `.env` file ensures secure and flexible configuration management, enhancing the maintainability and security of the application.

## API-Documentation

For detailed API documentation, please refer to the [POSTMAN API Documentation](https://documenter.getpostman.com/view/25319657/2sAYQfEpM7).

## #APP-Demostartion-Video

Access the weather app functionality demonstration video with this link [Weather App Video](https://drive.google.com/file/d/1synw7WWvN18lfYerWeuf-9z2Q2wUg57B/view)


## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Expo CLI installed
- A weather API key from OpenWeatherMap

### Installation


## Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **npm** or **yarn**
- **Expo CLI**

---

## Backend Setup

### 1. Clone the repository
```bash
git clone https://github.com/Pasindujay1/Weather_App.git
cd WeatherApp-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `WeatherApp-backend` directory and add the following:
```
PORT=8000
MONGODB_URL=mongodb+srv://pasindu:pasindu@cluster0.6elwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=vdbvjdbvkdbvksvbkdsbvkhbsdkvbsdkhk


```

### 4. Start the server
```bash
node app.js 
```
The server will run on `http://localhost:5000` by default.

---

## Frontend Setup

### 1. Navigate to the frontend folder
```bash
cd WeatherApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `WeatherApp-backend` directory and add the following:
```
API_KEY=e6a232397601d9345cd0bbef5583ab70
BASE_URL=https://api.openweathermap.org/data/2.5
GEO_URL=http://api.openweathermap.org/geo/1.0/reverse
TILE_URL=https://tile.openweathermap.org/map
API_URL=http://192.168.1.8:8000/api/auth


```

### 4. Start the Expo development server
```bash
npm run android
```

Scan the QR code with your Expo Go app to view the application on your device.

---
