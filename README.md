# Trip Satisfy

## Overview

This project is a comprehensive travel portal built with Nuxt.js. It allows users to search for and book flights, hotels, and tour packages. Additionally, B2B users can book flights using their credit. The project integrates with the Travel Port API to provide these services.

## Features

- **Flight Search & Booking:** Users can search for and book flights through the Travel Port API.
- **Hotel Search & Booking:** Users can explore and reserve hotels globally.
- **Tour Package Booking:** Users can discover and book various tour packages.
- **B2B Credit Booking:** B2B users have the ability to book flights using their available credit.

## Technology Stack

- **Frontend:** Nuxt.js
- **Backend:** Node.js, Express
- **API Integration:** Travel Port API via `uapi-json` package

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/qtecsolution/GoSahabi-nuxt.git
   cd GoSahabi-nuxt
   ```

2. **Install Dependencies:**

   Install all the necessary dependencies by running:

   ```bash
   npm install
   ```

3. **Run the Project:**

   To start the development server, run:

   ```bash
   npm run dev
   ```

   For production build and launch:

   ```bash
   npm run build
   npm run start
   ```

## Integration with Travel Port API

The project uses the `uapi-json` package to integrate with the Travel Port API. If you have made custom modifications to this package, ensure that these modifications are correctly applied during deployment. Refer to the [README.md](./api/modules/air/uapi-json/README.md) file located in the `./api/modules/air/uapi-json/` directory for specific instructions on handling these modifications.
