import { toast } from 'react-toastify';
import Axios from '../axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AccountInformation = ({user, setUser}) => {
    const initialValues = {
        name: user.name,
        email: user.email,
      };
    
      const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Email incorrect')
          .required('L\'adresse email est obligatoire')
        
      });

    const handleSubmit = (values) => {
        Axios.put(`/user/${user.id}`, values).then((response) => {
            setUser(response.data);
            toast.success("Vos modifications ont bien été enregistrées")
        }).catch((error) => {
            toast.error("Impossible d'enregistrer vos modifcations");
            document.querySelector('.error-message-login').innerHTML += error.response.data.message;
        })
    }

    return (
        <div>
            <h2>Mes informations</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                {({ isSubmitting }) => (
                    <Form className='w-50 my-5'>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field type="text" name="name" className="form-control" id="name" initialvalues={initialValues.name} />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" initialvalues={initialValues.email}/>
                        <ErrorMessage name="email" component="div" />
                    </div>
                    {/* <div className="form-group mt-3">
                        <label htmlFor="password">Mot de passe</label>
                        <Field type="password" name="password" className="form-control" id="password" initialvalues={initialValues.password}/>
                        <ErrorMessage name="password" component="div" />
                    </div> */}
                    <div className='error-message-login mt-3 text-danger'></div>
                    <button type="submit" className="btn btn-primary mt-4">
                    Enregistrer mes modifications
                    </button>
                </Form>
                )}
            </Formik>
        </div>
    );
}
export default AccountInformation;