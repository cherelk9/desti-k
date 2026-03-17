import {useState} from "react";
import {ExamenDisponibles} from "../../caisse/components/ExamenDisponibles";
import Button from "./Button";
import Modal from "./Modal";

const ListeExamens =()=>{
    const [examens, setExamens] = useState(ExamenDisponibles);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newMontant, setNewMontant] = useState('');

    const ajouterExamen = (e)=>{
        e.preventDefault();
        const nouvelExamen = {
            id:examens.length + 1,
            name: newName,
            montant: Number(newMontant)
        };
        setExamens([...examens, nouvelExamen]);

        //reset et fermeture
        setNewName('')
        setNewMontant('')
        setIsModalOpen(false);
    }

    return (
        <div style={{padding: '20px'}}>
            <h2>Gestion des EXAMENS</h2>
            <Button
                className="btn btn-primary btn-sm"
                onClick={()=>setIsModalOpen(true)}>Ajouter un examen</Button>


            <table
                className="table table-striped"
                style={{width: '100%', marginTop: '20px' , textAlign: 'left', borderCollapse: 'collapse'}}>
                <thead>
                    <tr style={{backgroundColor: '#f2f2f2'}}>
                        <th scope="col">ID</th>
                        <th scope="col">NOM DE EXAMEN</th>
                        <th scope="col">Montant (CFA)</th>
                        <th scope="col">operation</th>
                    </tr>
                </thead>
                <tbody>
                {
                    examens.map(examen=>(
                        <tr key={examen.id}>
                            <td>{examen.id}</td>
                            <td>{examen.name}</td>
                            <td>{examen.montant}</td>
                            <td><div className="row">
                                    <div className="col-5">
                                        <Button
                                            className="btn btn-danger btn-sm">DELETE</Button>
                                    </div>
                                    <div className="col-5">
                                        <Button
                                            className="btn btn-info btn-sm">
                                            UPDATE
                                        </Button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <Modal isOpen={isModalOpen}
                   onClose={()=>setIsModalOpen(false)}>
                <h3>
                    Nouvel Examen
                </h3>
                <form
                    style={{display: "flex", flexDirection: "column", gap: '10px'}}
                    onSubmit={ajouterExamen}>
                 <input
                    placeholder="Nom de l'examen..."
                    value={newName}
                    onChange={(e)=>setNewName(e.target.value)}
                    required
                 />
                    <input
                        type="number"
                        placeholder="Montant (CFA)...."
                        value={newMontant}
                        onChange={(e)=>setNewMontant(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        className="btn btn-primary btn-sm">
                        ENREGISTRER
                    </Button>
                </form>
            </Modal>
        </div>
    )
}

export default ListeExamens;