import {Datas} from "../../connexion/utils/datas";

const EmployersLabel = ({employerId}) => {
    const employer = Datas.find(e => e.id === employerId);

    const getBadgeClass = (role) => {
        switch (role) {
            case'Caisse': return "bg-success";
            case  'Accueil': return "bg-primary";
            case 'Admin' : return "bg-danger";
            default: return "bg-secondary";
        }
    }

    return (
        <div className="d-flex align-items-center p-2 border-bottom">
            <span className={`badge rounded-pill ${getBadgeClass(employer.role)} m-2`}>{employer.role}</span>
            <span className="fw-bold text-dark">{employer.name}</span>
            <span className="ms-auto text-muted">En ligne</span>
        </div>
    )
}