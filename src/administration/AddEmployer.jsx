import AddForm from "./components/AddForm";
import {useState} from "react";

import {Datas} from "../connexion/utils/datas"
import Button from "./components/Button";

import './styles/AddEmployer.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel} from "@fortawesome/free-solid-svg-icons";


function AddEmployer({searchTerm}) {

    const [isOpen, setIsOpen] = useState(false);
    const [employer, setEmployer] = useState(Datas);


    const filteredEmployer = Datas.filter(customer =>{
        if (!searchTerm || searchTerm === "") return true;

        return (customer.civility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.civility.email.toLowerCase().includes(searchTerm.toLowerCase()))
    })

    const listCustomersFilter = filteredEmployer.map((item) => {
            return <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>{item.password}</td>
                <th scope="row">
                    <Button onClick={() => setIsOpen(false)}
                            className="btn btn-info col-4 mx-3">Update</Button>
                    <Button onClick={() => setIsOpen(false)}
                            className="btn btn-danger col-4 mx-3">Delete</Button>
                </th>
            </tr>
    })

    const handleAddNewEmployee = (nUser) => {

        //on trouve l'id de notre tableau actuel
        const nextId = employer ? Math.max(...employer.map(e=>e.id)) + 1 : 1;
        const userWithId = {
            id: nextId,
            name: nUser.name,
            password: nUser.password,
            role: nUser.role

        };
        setEmployer([...employer, userWithId]);
        setIsOpen(false);
    }

    return (
        <div className="container">

            {/**title ******************************************/}
            <h2 className="pb-4"> Employer list</h2>

            <Button onClick={() => setIsOpen(true)}
                    className="btn btn-primary "
            >
                Add Employer
            </Button>

            {/****container ***************************************/}
            <div className="container-fluid">

                {/***part 1 add new user button **********************/}
                <div className="p-3">

                    {/***add new user button ************************************************/}



                    {/** new user form ********************************************************************/}
                    <AddForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        addEmployee={handleAddNewEmployee}
                    >

                        {/********formulaire header ********************************/}
                        <h2 style={{textAlign: 'center'}}> add new employer <FontAwesomeIcon icon={faCancel}/> </h2>


                    </AddForm>
                </div>

                {/** table how show all employer information***********************************/}
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr className="colum-value">
                            <th scope="col"> # </th>
                            <th scope="col">name</th>
                            <th scope="col">Role</th>
                            <th scope="col">password</th>
                            <th scope="col" className="px-5 mx-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employer.map((item) =>{
                            return (
                                <tr key={item.id}
                                    className="colum-value"
                                >
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>{item.password}</td>
                                    <th scope="row">
                                        <Button onClick={() => setIsOpen(false)}
                                                className="btn btn-info col-4 mx-3">Update</Button>
                                        <Button onClick={() => setIsOpen(false)}
                                                className="btn btn-danger col-4 mx-3">Delete</Button>
                                    </th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default AddEmployer;