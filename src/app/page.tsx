'use client';

import { useState, useEffect } from "react";
import SOSButton from "@/components/SOSButton";

export default function Home() {
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);

  // Try to get the user's location when the page loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Emergency SOS Button</h1>

      <div className="mb-6">
        <SOSButton />
      </div>

      <div className="max-w-md w-full p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mb-4">
        <h2 className="text-lg font-semibold mb-2">Emergency Information</h2>
        <div className="grid grid-cols-1 gap-2 text-left">
          <div className="p-2 bg-red-100 rounded-md border border-red-200">
            <p className="font-bold">Emergency Number:</p>
            <p className="text-2xl text-red-600 font-bold">108</p>
          </div>

          <div className="p-2 bg-blue-100 rounded-md border border-blue-200">
            <p className="font-bold">SMS will be sent to:</p>
            <p className="text-xl text-blue-600">1234567890</p>
          </div>

          {userLocation ? (
            <div className="p-2 bg-green-100 rounded-md border border-green-200">
              <p className="font-bold">Your Current Location:</p>
              <p>Latitude: {userLocation.latitude.toFixed(6)}</p>
              <p>Longitude: {userLocation.longitude.toFixed(6)}</p>
              <a
                href={`https://maps.google.com/?q=${userLocation.latitude},${userLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline mt-1 inline-block"
              >
                View on Google Maps
              </a>
            </div>
          ) : (
            <div className="p-2 bg-yellow-100 rounded-md border border-yellow-200">
              <p className="font-bold">Your Location:</p>
              <p>Waiting for permission to access your location...</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">About This App</h2>
        <p className="mb-3">When you press the SOS button:</p>
        <ul className="list-disc list-inside text-left mb-4">
          <li>Your current location will be detected</li>
          <li>A call will be placed to emergency number: <strong>1008</strong></li>
          <li>An SMS with your location will be sent to: <strong>1234567890</strong></li>
        </ul>
        <p className="text-sm text-gray-600">This is a demo application. In a real emergency, please dial your local emergency services directly.</p>
      </div>
    </div>
  );
}
