export default function ProgressDots({ current, total }){

    return(

        <div className="progress-dots" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>

            {

                [...Array(total)].map((_,index)=>(

                    <span

                        key={index}

                        className={

                            index < current

                            ? "dot active"

                            : "dot"

                        }

                        aria-hidden={index < current ? "false" : "true"}

                    />

                ))

            }

        </div>

    );

}