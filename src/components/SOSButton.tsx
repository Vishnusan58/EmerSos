'use client';

import { useState } from 'react';
import styles from './SOSButton.module.css';

interface Location {
  latitude: number;
  longitude: number;
}

const SOSButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEmergencySOS = async () => {
    setIsLoading(true);
    try {
      // Get user's current location
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const location: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Build Google Maps link
      const mapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

      // Prepare emergency message
      const emergencyMessage = `I need help! My location: ${mapsLink}`;

      // Try to use Web Share API if available
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Emergency SOS',
            text: emergencyMessage,
            url: mapsLink
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      }

      // Trigger phone call to ambulance
      window.open(`tel:10978`, '_self');

      // After a short delay, trigger SMS
      setTimeout(() => {
        window.open(`sms:1234567890?body=${encodeURIComponent(emergencyMessage)}`, '_self');
      }, 1000);

    } catch (error) {
      console.error('Error handling emergency:', error);
      alert('Failed to get your location. Please try again or manually call emergency services.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.sosButton}
        onClick={handleEmergencySOS}
        disabled={isLoading}
      >
        {isLoading ? 'Getting Location...' : '🚨 SOS'}
      </button>
    </div>
  );
};

export default SOSButton;
