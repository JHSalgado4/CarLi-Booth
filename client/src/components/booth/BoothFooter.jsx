export default function BoothFooter({ currentShot = 1, totalShots = 6 }){

    return(

        <div className="booth-footer">

            <p className="booth-footer-instruction">
                Strike your best pose.
            </p>

            <p className="booth-footer-subtitle">
                The photo will be taken automatically.
            </p>

            <p className="booth-footer-count">
                Photo {currentShot} of {totalShots}
            </p>

        </div>

    );

}