import {Image} from "../img/components/Images";
import {useNavigate} from "react-router-dom";
import TexteAccueil from "./components/TexteAccueil";
import FormConnexion from "./components/FormConnexion";
import Utils from "./utils/Utils";
import {Datas} from "./utils/datas";
import {useState} from "react";


const Connexion = () => {

    const [error, setError] = useState(false)
    const navigate = useNavigate();


    const handleLogin = e =>{
        e.preventDefault();
        setError(false);
        const formData = new FormData(e.currentTarget);
        const nName = formData.get("name");
        const nPassword = formData.get("password");

        const userFound = Datas.find(user=>user.name.trim() === nName?.trim() && user.password.trim() === nPassword);

       if (userFound) {
            if (userFound.role === "Accueil") {
                localStorage.setItem("userConnecte", JSON.stringify(userFound))
                navigate("/accueil", {state: {message: "Bienvenue dans l'espace Accueil"}});
            }
            else if(userFound.role === "Admin"){
                localStorage.setItem("userConnecte", JSON.stringify(userFound))
                navigate("/admin", {state: {message: "Bienvenue dans l'espace administration"}});
            }
            else if (userFound.role === "Caisse") {
                localStorage.setItem("userConnecte", JSON.stringify(userFound))
                navigate("/caisse", {state: {message: "Bienvenue a la caisse "}});
            }
            setError(true);
        }else{
           setError(true);
       }
    }

    return (

        <div className ="container-fluid m-auto">
            <div className="row justify-content-center">
                <div className="col-7 py-5 border-none">
                    <div className="card text-bg-dark border-none">
                        <img className="card-img border-none" src={Image.imageLabo.image} alt={Image.imageLabo.title}/>
                        <div className="card-img-overlay">
                            <TexteAccueil
                                title={Utils.title}
                                description={Utils.description}
                                info={Utils.info.adresse}
                                contacts={Utils.info.contacts}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4 bg-white">
                    <FormConnexion
                        onSubmit={handleLogin}
                    />
                </div>
                {error && (
                    <div className=" contaier alert alert-danger alert-dismissible" role="alert">
                        <div className="container p-4 m-4 text-center">
                            <strong>Access refuse ! </strong> Identification incorrect ou role non autorise.
                            <button
                                className="btn-close m-3"
                                onClick={()=>setError(false)}>
                            </button>
                        </div>

                    </div>
                )}
            </div>

        {/*<div className="container-fluid  p-6 m-6">
            <div className="row py-5">
                <div className="col-7 bg-primary  py-4">
                    <div className="justify p-5">
                        <div className="row">
                            <div className="col-7 p-3">
                                <ImageForm
                                    image={Image.imageLabo.image}
                                    title={Image.imageLabo.title}
                                    width={400}
                                    height={400}
                                    className="rounded-3"
                                />
                            </div>
                            <div className="col-4 px-4 border-solid-black">
                                <TexteAccueil
                                    title={Utils.title}
                                    description={Utils.description}
                                    info={Utils.info.adresse}
                                    contacts={Utils.info.contacts}
                                    className="fw-bold p-3  fs-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 bg-white">
                    <FormConnexion/>
                </div>
            </div>
        </div>*/}</div>
    )
}

export default Connexion;