import {CustomerList} from "../../connexion/utils/CustomerList";

import '../styles/Customers.css'
import { useNavigate} from "react-router-dom";
import Button from "./Button";
//import {useState} from "react";




function Customers({searchTerm}) {

    const navigate = useNavigate();


    const filteredCustomers = CustomerList.filter((customer) => {
        if(!searchTerm ||searchTerm=== "")
            return true;
        return (customer.civility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.civility.email.toLowerCase().includes(searchTerm.toLowerCase()))
        })

    const listCustomersFilter = filteredCustomers.map((customer) => {
        return  <tr key={customer.id} className="customer-list">
            <td>{customer.id}</td>
            <td>{customer.civility.name}</td>
            <td>{customer.civility.email}</td>
            <td>{new Intl.DateTimeFormat('fr-FR',{dateStyle: 'medium', timeStyle: 'short'}).format(new Date())}</td>
            <td><Button className="btn btn-info " onClick={()=>navigate(`/single_customer/${customer.id}`)}>More infos</Button></td>
        </tr>
    })

   /* const listCustomers = CustomerList.map((customer) => {

            return  <tr key={customer.id} className="customer-list">
                <td>{customer.id}</td>
                <td>{customer.civility.name}</td>
                <td>{customer.civility.email}</td>
                <td>{new Intl.DateTimeFormat('fr-FR',{dateStyle: 'medium', timeStyle: 'short'}).format(new Date())}</td>
                <td><Button className="btn btn-info " onClick={()=>navigate(`/single_customer/${customer.id}`)}>More infos</Button></td>
            </tr>
    })*/
    return (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">time</th>
                        <th scope="col">more info</th>
                    </tr>
                    </thead>
                    <tbody>
                    { listCustomersFilter}
                    </tbody>
                </table>
    )
}
export default Customers;