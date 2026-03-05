import AddForm from "./components/AddForm";
import {useState} from "react";

import {Datas} from "../connexion/utils/datas"
import Button from "./components/Button";


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
            <h2 className="py-5"> Employer list</h2>

            {/****container ***************************************/}
            <div className="row">

                {/***part 1 add new user button **********************/}
                <div className="col-3">

                    {/***add new user button ************************************************/}
                    <Button onClick={() => setIsOpen(true)}
                            className="btn btn-primary "
                    >
                        Add Employer
                    </Button>


                    {/** new user form ********************************************************************/}
                    <AddForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        addEmployee={handleAddNewEmployee}
                    >

                        {/********formulaire header ********************************/}
                        <h2 style={{textAlign: 'center'}}> add new employer </h2>


                    </AddForm>
                </div>

                {/** table how show all employer information***********************************/}
                <div className="col-8">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" > # </th>
                            <th scope="col">name</th>
                            <th scope="col">Role</th>
                            <th scope="col">password</th>
                            <th scope="col" className="px-5 mx-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employer.map((item) =>{
                            return (
                                <tr key={item.id}>
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