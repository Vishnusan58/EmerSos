# Emergency SOS Button PWA

A Progressive Web App (PWA) built with Next.js and TypeScript that provides a simple one-tap emergency SOS button.

![Emergency SOS Button](https://img.shields.io/badge/Emergency-SOS-red)

## Features

- **Big Red SOS Button**: A prominent, easy-to-tap emergency button
- **Location Tracking**: Automatically captures your current GPS coordinates
- **Emergency Calling**: One-tap calling to emergency services (108)
- **SMS Integration**: Automatically prepares an SMS with your location to send to emergency contacts
- **Web Share API Support**: Share your emergency location via your device's native sharing options
- **Mobile Optimized**: Designed to work well on mobile devices
- **Real-time Location Display**: Shows your current coordinates on the page

## How It Works

When you press the SOS button:

1. The app requests your current location
2. It builds a Google Maps link with your coordinates
3. It attempts to call the emergency number (108)
4. It prepares an SMS with your location to send to your emergency contact (1234567890)
5. If your device supports it, it also triggers the Web Share API

## Technical Details

- Built with Next.js (App Router) and TypeScript
- Uses React hooks for state management
- Mobile-optimized UI with responsive design
- Uses the Geolocation API to get precise coordinates
- Implements tel: and sms: protocol handlers for communication

## Installation

```bash
# Clone the repository
git clone <your-repository-url>

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Usage

1. Open the app in your browser
2. Grant location permissions when prompted
3. In an emergency, press the big red SOS button
4. The app will attempt to call emergency services and send your location

## Deployment

This app has been deployed on Vercel. For the best experience with location services, access the deployed version over HTTPS.

```bash
# Build for production
npm run build

# Deploy (if using Vercel)
vercel deploy
```

## Important Notes

- **Location Services**: This app requires location permissions to function properly
- **Mobile Support**: Phone calls and SMS work best on mobile devices
- **Secure Context**: Geolocation requires HTTPS (or localhost) for security reasons
- **Demo Only**: This is a demonstration app - in a real emergency, directly call local emergency services

## License

[MIT](LICENSE)

## Disclaimer

This application is for demonstration purposes only. In a real emergency situation, please directly call your local emergency services.
