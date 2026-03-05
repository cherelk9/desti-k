import {createPortal} from "react-dom";
import FormulaireEmployer from "./FormulaireEmployer";

export default function AddForm({ isOpen, children, addEmployee}) {


    if (!isOpen) return null;
    return createPortal(
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                background:'white',
                padding: '10px',
                borderRadius: '8px'
            }}>
                {children}
                <div className="container-fluid">
                    <div className="row m-auto">

                        {/* user form how are use to add new employer information *******************************/}
                        <FormulaireEmployer
                            onAdd={addEmployee}
                            onClose={isOpen}
                        />
                    </div>

                </div>

            </div>
        </div>,
        document.body
    );

}