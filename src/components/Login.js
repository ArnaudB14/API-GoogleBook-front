import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
const Login = props => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email incorrect')
      .required('L\'adresse email est obligatoire'),
    password: Yup.string()
      .min(6, 'Ton mot de passe doit faire au moins 6 caractères')
      .required('Le mot de passe est obligatoire')
  });
  const onSubmit = (values) => {
    const storedData = localStorage.getItem('userInscrit');
    if (storedData) {
      const existingData = JSON.parse(storedData);
      const userExists = existingData.some((user) => user.email === values.email && user.password === values.password);
      if (userExists) {
        props.login(values);
      } else {
        toast.error('Email ou Mot de passe incorrect');
      }
    } else {
      toast.error('Aucun utilisateur enregistré');
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
                <Form className='p-3 mx-auto w-fit-content login-form mt-5'>
                <ToastContainer position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme="dark"
                    pauseOnHover={false}
                />
                <div className="form-group ">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control"/>
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password">Mot de passe</label>
                  <Field type="password" name="password" className="form-control"/>
                  <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Se connecter
                </button>
              </Form>
            )}
          </Formik>
        );
      };
    export default Login;