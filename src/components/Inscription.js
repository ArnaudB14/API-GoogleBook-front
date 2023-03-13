import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from '../axios'
import { useNavigate } from 'react-router-dom';

const Inscription = ({redirect, setUser}) => {

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie')
  const register = async (values, { resetForm }) => {
    await csrf()
    try {
      await axios.post('/register', values)
      toast.success("Inscription réussie");

      const response = await axios.get('/api/user')
      setUser(response.data);
      console.log(response.data);
      navigate("/");

    } catch(error) {
      if (error.response.status !== 422) throw error
      document.querySelector('.error-message-register').innerHTML += error.response.data.message;
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Ton Username doit faire au moins 3 caractères')
      .required('L\'Username est obligatoire'),
    email: Yup.string()
      .email('Email invalide')
      .required('L\'email est obligatoire'),
    password: Yup.string()
      .min(8, 'Ton mot de passe doit faire au moins 8 caractères')
      .required('Le mot de passe est obligatoire'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
      .required('Le mot de passe est obligatoire')
  });

  // const onSubmit = (values, { resetForm }) => {
  //   const storedData = localStorage.getItem('userInscrit');
  //   const emailValue = document.querySelector('.emailInscription').value;

  //   var emails=[];
  //   for(var item of storedData){
  //     emails.push(item.email);
  //   }
  //   if(storedData.includes(emailValue)) {
  //     toast.error("Cette adresse email est déjà utilisée");
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, "2000")
  //   } else {
  //     const existingData = storedData ? JSON.parse(storedData) : [];
  //     existingData.push(values);
  //     localStorage.setItem('userInscrit', JSON.stringify(existingData));
  //     resetForm();
  //     toast.success('Votre inscription est réussie');
  //     redirect();
  //   }

  // };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={register}>
      {({ isSubmitting }) => (
        <Form className='p-3 mx-auto w-fit-content login-form mt-5'>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="form-control"/>
            <ErrorMessage name="name" component="div" />
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
            <label htmlFor="password_confirmation">Confirmer votre mot de passe</label>
            <Field type="password" name="password_confirmation" className="form-control"/>
            <ErrorMessage name="password_confirmation" component="div" />
          </div>
          <div className='error-message-register mt-3 text-danger'></div>
          <button type="submit" disabled={isSubmitting}  className="btn btn-primary mt-4">
            S'inscrire
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Inscription;