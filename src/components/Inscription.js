import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const Inscription = ({redirect}) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Ton Username doit faire au moins 3 caractères')
      .required('L\'Username est obligatoire'),
    email: Yup.string()
      .email('Email invalide')
      .required('L\'email est obligatoire'),
    password: Yup.string()
      .min(6, 'Ton mot de passe doit faire au moins 6caractères')
      .required('Le mot de passe est obligatoire'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
      .required('Le mot de passe est obligatoire')
  });

  const onSubmit = (values, { resetForm }) => {
    const storedData = localStorage.getItem('userInscrit');
    const emailValue = document.querySelector('.emailInscription').value;
    var vals=[];
    for(var item of storedData){
       vals.push(item.email);
    }
    if(storedData.includes(emailValue)) {
      toast.error("Cette adresse email est déjà utilisée");
      setTimeout(() => {
        window.location.reload();
      }, "2000")
    } else {
      const existingData = storedData ? JSON.parse(storedData) : [];
      existingData.push(values);
      localStorage.setItem('userInscrit', JSON.stringify(existingData));
      resetForm();
      toast.success('Votre inscription est réussie');
      redirect();
    }

  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className='p-3 mx-auto w-fit-content login-form mt-5'>
          <ToastContainer position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"
            pauseOnHover={false}
          />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" className="form-control"/>
            <ErrorMessage name="username" component="div" />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control emailInscription"/>
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="password">Mot de passe</label>
            <Field type="password" name="password" className="form-control"/>
            <ErrorMessage name="password" component="div" />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
            <Field type="password" name="confirmPassword" className="form-control"/>
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}  className="btn btn-primary mt-4">
            S'inscrire
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Inscription;