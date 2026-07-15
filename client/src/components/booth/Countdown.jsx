export default function Countdown({ value }){

    return(

        <div className="countdown-container">

            <h1 className="countdown" aria-live="polite" aria-atomic="true">

                {value}

            </h1>

        </div>

    );

}