import { ToastContainer, toast } from 'react-toastify';
const AccountInformation = ({user, setUser}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        setUser({...user, values: {...user.values, email: email}});
        toast.success("Vos informations ont bien été modifiées");
    }
    
    return (
        <div>
            <h2>Mes informations</h2>
            <form className="w-50 my-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" defaultValue={user.values.email} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={user.values.password} disabled/>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Modifier</button>
            </form>
            <ToastContainer position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        theme="dark"
                      />
        </div>
    );
}
export default AccountInformation;