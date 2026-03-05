import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faLock, faUserTag, faArrows} from "@fortawesome/free-solid-svg-icons";

const FormConnexion = ({onSubmit}) => {
    return (
        <div className="container  m-5">
            <div className="row justify-content-center">
                <div className="card  border-0 rounded-4">
                    <div className="card-body p-5">
                        <h3 className="text-center mb-4 text-primary fw-bold">
                            connexion
                        </h3>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formConnexion" className="fw-semibold">
                                    Nom utilisateur
                                </label>
                                <div className="input-groupe">
                                    <span className="input-group-text bg-light border-end-0">
                                        <FontAwesomeIcon icon={faUser}/>
                                        <input name="name" type="text" className="form-control border-start-0 bg-light" placeholder="EX : lionel elembe"/>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formConnexion" className="fw-semibold">Mot de passe </label>
                                <div className="input-groupe">
                                    <span className="input-group-text bg-light border-end-0">
                                        <FontAwesomeIcon icon={faLock}/>
                                        <input name="password" type="password" className="form-control border-start-0 bg-light" placeholder=" password1234"/>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formConnexion" className="fw-semibold">Role</label>
                                <div className="input-groupe">
                                    <span className="input-group-text bg-light border-end-0">
                                        <FontAwesomeIcon icon={faUserTag}/>
                                        <select className="form-control border-start-0 bg-light border-end-0">
                                            <option selected disabled>
                                                Choisir un role ...
                                            </option>
                                            <option value="Accueil">Accueil</option>
                                            <option value="Caisse">Caisse</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </span>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button
                                    //{/*onSubmit={onSubmit}*/}

                                    type="submit" className="btn btn-primary btn-lg rounded-pill shadow-sm">
                                    connexion
                                    <FontAwesomeIcon icon={faArrows}/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormConnexion;