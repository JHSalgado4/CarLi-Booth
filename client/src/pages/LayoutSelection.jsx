import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoBooth } from "../context/PhotoBoothContext";

import PaperFrame from "../components/invitation/PaperFrame";
import LayoutGrid from "../components/layout/LayoutGrid";
import Button from "../components/common/Button";
import "../styles/layout.css";

export default function LayoutSelection() {

    const navigate = useNavigate();
    const { setLayout } = usePhotoBooth();

    const [selected, setSelected] = useState(null);

    const handleContinue = () => {
        if (selected) {
            setLayout(selected);
            navigate("/camera");
        }
    };

    return (

        <PaperFrame>

            <LayoutGrid
                selected={selected}
                setSelected={setSelected}
            />

            <div className="layout-footer">
                <Button 
                    disabled={!selected}
                    onClick={handleContinue}
                    className="layout-continue-button"
                >
                    Continue
                </Button>
            </div>

        </PaperFrame>

    );

}