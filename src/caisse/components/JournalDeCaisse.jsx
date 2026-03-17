const JournalDeCaisse = ({transaction, searchTerm}) => {
    const calculeTotale = (mode)=>{
        return transaction.filter((t)=> mode === 'Tout' ? true : t.mode === mode).reduce((sum, t) => sum + t.montant, 0);
    }

    const filteredCustomers = transaction.filter((trans) => {
        if(!searchTerm ||searchTerm=== "")
            return true;
        return (trans.name.includes(searchTerm.toLowerCase()) ||
            trans.mode.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })

    const listTransactionFilter = filteredCustomers.map((t) => {
        return  <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.name}</td>
            <td className="bg-light text-dark border">{t.mode}</td>
            <td className="text-end fw-bold">{t.montant}</td>
        </tr>
    })

    return (
        <div className="card m-3 p-3 shadow-sm border-0">
            <h5 className="mb-4">Historique des Transactions</h5>

            <div className="d-flex justify-content-between mb-4">
                <div className="text-center border-end px-4">
                    <small className="text-muted">Espece </small>
                    <h5 className="text-success">{calculeTotale('Espece')} FCFA</h5>
                </div>

                <div className="text-center border-end px-4">
                    <small className="text-muted">OM && MOMO </small>
                    <h5 className="text-warning">{calculeTotale('OM')+calculeTotale('MOMO')} FCFA</h5>
                </div>

                <div className="text-center border-end px-4">
                    <small className="text-muted">TOTAL DE LA JOURNEE </small>
                    <h5 className="text-primary">{calculeTotale('Tout')} FCFA</h5>
                </div>
            </div>

            <table className="table table-hover">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Date | Heure</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Mode</th>
                        <th scope="col" className="text-end">Montant</th>
                    </tr>
                </thead>
                <tbody>
                {
                    listTransactionFilter
                }
                </tbody>
            </table>
        </div>
    )
}

export default JournalDeCaisse;