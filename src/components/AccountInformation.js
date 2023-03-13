import { toast } from 'react-toastify';

const AccountInformation = ({user, setUser}) => {

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <div>
            <h2>Mes informations</h2>
            <form className="w-50 my-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username"  value={user.name} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={user.email} />
                </div>
                <button type="submit" className="btn btn-primary mt-4">Modifier</button>
            </form>
        </div>
    );
}
export default AccountInformation;