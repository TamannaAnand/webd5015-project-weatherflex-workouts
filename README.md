# WeatherFlex Workouts

WeatherFlex Workouts is a web application designed to provide personalized workout recommendations based on the current weather conditions in your location. Whether it's sunny, rainy, or snowing, the app uses AI to tailor workouts for both indoor and outdoor environments—so you can stay active, no matter the weather.

## Features

- Real-Time Weather Integration via the OpenWeather API.
- AI-Powered Workouts generated through the Gemini API.
- Stripe Integration (Test Mode) to simulate a premium subscription model.
- Hosted Database using PostgreSQL on Neon
- Dynamic Content Updates with Next.js App Router and on-demand revalidation
- User Data Management with Prisma ORM

## Tech Stack

- Template: Play Next.js (https://play.demo.nextjstemplates.com/)
- Frontend: React (with Next.js)
- Backend: Next.js App Router (API routes)
- Database: PostgreSQL (Neon)
- Payments: Stripe (test mode)
- APIs: OpenWeather & Gemini
## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/weatherflex-workouts.git
    cd weatherflex-workouts
    ```

2. Install dependencies using `pnpm`:
    ```bash
    pnpm install
    ```

3. Start the development server:
    ```bash
    pnpm dev
    ```

## Testing Credentials

### User Login
- **Email:** testuser@example.com
- **Password:** test@1234

### Stripe Test Mode
- **Card Number:** 4242 4242 4242 4242
- **Expiration Date:** Any future date
- **CVC:** Any 3 digits
- **ZIP Code:** Any 5 digits

## License

This project is licensed under the [MIT License](LICENSE).
