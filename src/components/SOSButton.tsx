'use client';

import { useState, useEffect } from 'react';
import styles from './SOSButton.module.css';

interface Location {
  latitude: number;
  longitude: number;
}

const SOSButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSecureContext, setIsSecureContext] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Check if we're in a secure context on component mount
  useEffect(() => {
    // window.isSecureContext tells us if we're in a secure context (HTTPS or localhost)
    const secure = typeof window !== 'undefined' && (window.isSecureContext || window.location.hostname === 'localhost');
    setIsSecureContext(secure);

    if (!secure) {
      setLocationError('This application requires a secure connection (HTTPS) to access location features.');
      console.warn('Not in a secure context - geolocation will not work');
    }
  }, []);

  const handleEmergencySOS = async () => {
    setIsLoading(true);
    setLocationError(null);

    try {
      // Check if browser supports geolocation
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      // Check if we're in a secure context
      if (!isSecureContext) {
        throw new Error('Geolocation requires a secure connection (HTTPS) or localhost for testing');
      }

      // Get user's location with proper error handling
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (positionError) => {
            console.error('Geolocation error details:', positionError);
            let errorMsg = `Geolocation error: ${positionError.message}`;

            // Add specific guidance based on error code
            if (positionError.code === 1) {
              errorMsg = 'Location access was denied. Please enable location services and try again.';
            } else if (positionError.code === 2) {
              errorMsg = 'Unable to determine your location. Please try again or use a different device.';
            } else if (positionError.code === 3) {
              errorMsg = 'Location request timed out. Please try again.';
            }

            reject(new Error(errorMsg));
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });

      const location: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      console.log('Location obtained:', location);

      // Build Google Maps link
      const mapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

      // Prepare emergency message
      const emergencyMessage = `I need help! My location: ${mapsLink}`;

      // Try to use Web Share API if available
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({
            title: 'Emergency SOS',
            text: emergencyMessage,
            url: mapsLink
          });
          console.log('Shared successfully using Web Share API');
        } catch (shareError) {
          console.error('Error sharing via Web Share API:', shareError);
          // Continue with other methods even if sharing fails
        }
      } else {
        console.log('Web Share API not available on this device/browser');
      }

      // Trigger phone call to ambulance (108)
      try {
        window.open(`tel:10832`, '_blank');
        console.log('Phone call triggered');
      } catch (callError) {
        console.error('Error triggering phone call:', callError);
      }

      // After a short delay, trigger SMS
      setTimeout(() => {
        try {
          window.open(`sms:1234567890?body=${encodeURIComponent(emergencyMessage)}`, '_blank');
          console.log('SMS triggered');
        } catch (smsError) {
          console.error('Error triggering SMS:', smsError);
        }
      }, 1000);

    } catch (error) {
      console.error('Error handling emergency:', error);
      // Store the error message to display in the UI
      if (error instanceof Error) {
        setLocationError(error.message);
      } else {
        setLocationError('Failed to get your location. Please try again or manually call emergency services.');
      }
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

      {locationError && (
        <div className={styles.errorMessage}>
          <p>{locationError}</p>
          {!isSecureContext && (
            <p>
              <strong>Development Note:</strong> Geolocation requires HTTPS. For testing, use:
              <ul>
                <li>localhost (http://localhost:3000)</li>
                <li>Deploy to a service with HTTPS (Vercel, Netlify, etc.)</li>
                <li>Set up a local HTTPS certificate</li>
              </ul>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SOSButton;
