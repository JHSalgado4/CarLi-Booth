import Webcam from "react-webcam";

export default function CameraView({ webcamRef, onReady, onError }){

    return(

        <div className="camera-frame">

            <Webcam

                ref={webcamRef}

                mirrored

                audio={false}

                screenshotFormat="image/jpeg"

                screenshotQuality={0.95}

                videoConstraints={{
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                }}

                onUserMedia={() => onReady && onReady()}

                onUserMediaError={(error) => onError && onError(error)}

                className="camera-feed"

            />

        </div>

    );

}