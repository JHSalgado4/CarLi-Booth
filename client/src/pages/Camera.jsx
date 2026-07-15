import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";

import CameraView from "../components/booth/CameraView";
import Countdown from "../components/booth/Countdown";
import ProgressDots from "../components/booth/ProgressDots";
import Flash from "../components/booth/Flash";
import BoothHeader from "../components/booth/BoothHeader";
import BoothFooter from "../components/booth/BoothFooter";

import "../styles/camera.css";

const TOTAL_PHOTOS = 6;

export default function Camera() {

    const navigate = useNavigate();
    const { setCapturedPhotos } = usePhotoBooth();

    const webcamRef = useRef(null);

    const [countdown, setCountdown] = useState(5);

    const [currentShot, setCurrentShot] = useState(1);

    const [photos, setPhotos] = useState([]);

    const [flash, setFlash] = useState(false);

    const [error, setError] = useState(null);

    const [isReady, setIsReady] = useState(false);

    // Auto-capture countdown timer
    useEffect(() => {

        if (countdown === 0) {

            capturePhoto();

            return;

        }

        const timer = setTimeout(() => {

            setCountdown(prev => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [countdown]);

    // Handle camera ready state
    const handleCameraReady = () => {
        setIsReady(true);
        setError(null);
    };

    // Handle camera errors
    const handleCameraError = (error) => {
        console.error("Camera error:", error);
        setError("Unable to access camera. Please check permissions.");
        setIsReady(false);
    };

    // Capture photo with validation
    const capturePhoto = () => {

        if (!webcamRef.current) {
            setError("Camera not ready");
            return;
        }

        try {
            const image = webcamRef.current.getScreenshot();

            if (!image) {
                setError("Failed to capture photo");
                return;
            }

            // Flash effect
            setFlash(true);
            setTimeout(() => setFlash(false), 300);

            const updatedPhotos = [...photos, image];
            setPhotos(updatedPhotos);

            // Check if done with all 6 photos
            if (currentShot >= TOTAL_PHOTOS) {
                setCapturedPhotos(updatedPhotos);

                navigate("/review");

                return;

            }

            // Move to next photo
            setCurrentShot(prev => prev + 1);
            setCountdown(5);

        } catch (err) {
            console.error("Capture error:", err);
            setError("Error capturing photo");
        }

    };

    // Manual capture button (backup)
    const handleManualCapture = () => {
        setCountdown(0);
    };

    return (

        <div className="camera-page">

            <BoothHeader />

            {error && (
                <div className="camera-error">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            <CameraView 
                webcamRef={webcamRef}
                onReady={handleCameraReady}
                onError={handleCameraError}
            />

            {isReady && (
                <>
                    <Countdown value={countdown} />

                    <ProgressDots
                        current={currentShot}
                        total={TOTAL_PHOTOS}
                    />

                    <button 
                        className="camera-manual-capture"
                        onClick={handleManualCapture}
                        aria-label="Capture photo"
                    >
                        CAPTURE
                    </button>
                </>
            )}

            <BoothFooter currentShot={currentShot} totalShots={TOTAL_PHOTOS} />

            {flash && <Flash />}

        </div>

    );

}

