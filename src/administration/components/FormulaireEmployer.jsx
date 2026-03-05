import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLock, faUser, faUserTag} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import {useState} from "react";

const FormulaireEmployer = ({onAdd, onClose}) => {

    const [formData, setFormData] = useState({name: '', password: '', role: ''});

   const handleChange = e => {
        const {name, value} = e.target;
        setFormData((prev)=> ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name || !formData.password) return;
        onAdd(formData);
        setFormData({name: '', role: '', password: ''});
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card  border-0 rounded-4">
                    <div className="card-body p-5">

                        {/*debut du formulaire*/}
                        <form onSubmit={handleSubmit}>

                            {/*new employer user name  ***********************************************************************************/}
                            <div className="mb-3">
                                <label htmlFor="formConnexion" className="fw-semibold">
                                    Nom utilisateur
                                </label>
                                <div className="input-groupe">
                                    <span className="input-group-text bg-light border-end-0">
                                        <FontAwesomeIcon icon={faUser}/>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text" className="form-control border-start-0 bg-light" placeholder="EX : lionel elembe" required={true}/>
                                    </span>
                                </div>
                            </div>

                            {/*new employer password ***********************************************************************************/}
                            <div className="mb-3">
                                <label htmlFor="formConnexion" className="fw-semibold">Mot de passe </label>
                                <div className="input-groupe">
                                    <span className="input-group-text bg-light border-end-0">
                                        <FontAwesomeIcon icon={faLock}/>
                                        <input
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            type="text" className="form-control border-start-0 bg-light" placeholder=" password1234" required={true}/>
                                    </span>
                                </div>
                            </div>


                            {/*new employer role ***********************************************************************************/}
                            <div className="mb-3">
                                <label htmlFor="formConnexion" className="fw-semibold">Role</label>
                                <div className="input-groupe">
                                    <span className="input-group-text bg-light border-end-0">
                                        <FontAwesomeIcon icon={faUserTag}/>
                                        <select className="form-control border-start-0 bg-light border-end-0 fw-bold"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                        >
                                            <option selected value=" ">
                                                Choisir un role ...
                                            </option>
                                            <option className="fw-bold" value="Accuei">Accueil</option>
                                            <option className="fw-bold" value="Caisse">Caisse</option>
                                            <option className="fw-bold" value="Admin">Admin</option>
                                        </select>
                                    </span>
                                </div>
                            </div>

                            <div className="d-grid">
                                <div className="container-fluid">
                                    <div className="row m-auto">


                                        {/*bouton pour cancel de la page***********************************************************/}
                                        <Button
                                            onClick={onClose}
                                            className="btn btn-danger col-5"
                                        >cancel</Button>

                                        <div className="col-2"></div>


                                        {/*bouton pour ajouter les users **********************************************************/}
                                        <Button
                                            className="btn btn-primary col-5"
                                        >
                                            add
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormulaireEmployer;