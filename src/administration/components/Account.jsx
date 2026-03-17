const Account =  ({users}) => {

    const style = {
        container: {padding: '40px', backgroundColor: '#ffffff', minHeight: '100%'},
        header: {color : '007bff' , fontWeight: 'bold', marginBottom: '30px'},
        card: {borderRadius: '12px' , border: '1px solid #e9ecef', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'},
        avatar: {
            width: '80px',
            height: '80px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
        },
        roleBadge: {
            backgroundColor: '#e7f1ff',
            color: '#007bff',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '14px',
        }
    }

    return (
        <div style={style.container}>
            <h2 style={style.header}>
                Mon profil
            </h2>

            <div className="row">
                <div className="col-md-4 text-center">
                    <div className="card p-4" style={style.card}>
                        <div style={style.avatar}>{users.name.charAt(0).toUpperCase()}</div>
                        <h4 className="fw-bold">{users.name}</h4>
                        <span style={style.roleBadge} className="fw-bold">{users.role}</span>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card p-4 h-100" style={style.card}>
                        <h5 className="fw-bold mb-4 border-bottom pd-2">Details du compte</h5>
                        <div className="mb-3">
                            <label className="text-muted small d-block">NOM D'UTILISATEUR</label>
                            <span className="fw-semibold"> @{users.name || 'destik_user'}</span>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small d-block">EMAIL</label>
                            <span className="fw-semibold"> contact@desti-k</span>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small d-block">PASSWORD</label>
                            <span className="fw-semibold"> {users.password || ' null '}</span>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small d-block">DERNIERE ACTIVITE</label>
                            <span className="fw-semibold">en ligne maintenant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;