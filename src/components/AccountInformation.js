import { ToastContainer, toast } from 'react-toastify';
import {  useRef } from 'react';

const AccountInformation = ({user, setUser}) => {
    console.log(user)

    let currentUser = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        setUser({...user, values: {...user.values, email: email, username: username, password: password}});
        const userInscrit = JSON.parse(localStorage.getItem('userInscrit'));
        let index = -1;
        userInscrit.forEach((inscrit, i) => {
            if (inscrit.email === user.values.email) {
                index = i;
            }
        });

        if (index > -1) {
            userInscrit[index].email = email;
            userInscrit[index].username = username;
            userInscrit[index].password = password;
            localStorage.setItem('userInscrit', JSON.stringify(userInscrit));
            toast.success("Vos informations ont bien été modifiées");
        } else {
            toast.error("L'utilisateur n'a pas été trouvé dans la base de données");
        }
    }

    const verifUser = JSON.parse(localStorage.getItem('user'));
    const userInscrit = JSON.parse(localStorage.getItem('userInscrit'));
    let index = -1;
    userInscrit.forEach((inscrit, i) => {
        if (inscrit.email === verifUser.values.email) {
            index = i;
            currentUser.current = userInscrit[index];
        }
    });

    console.log(currentUser)

    return (
        <div>
            <h2>Mes informations</h2>
            <form className="w-50 my-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username"  value={currentUser.current.username} disabled />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={currentUser.current.email} disabled/>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={currentUser.current.password} disabled/>
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