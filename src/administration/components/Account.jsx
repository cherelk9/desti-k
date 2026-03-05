const Account =  ({users, children}) => {

    return (
        <div className="container">
            {children}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content bg-primary">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-danger" id="exampleModalLabel">info de l'utilisateur</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5 className=" fs-6 text-light">username : {users.name}</h5>
                            <h5 className=" fs-6 text-light">password : {users.password}</h5>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;