import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from '../axios'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email incorrect')
      .required('L\'adresse email est obligatoire')
  });

  const navigate = useNavigate();

  const changePassword = (values) => {
    axios.post('/forgot-password', values).then(()=> {
        toast.success("Un lien a été envoyé à votre adresse mail pour réinitialiser votre mot de passe");
        navigate('/login');
    }).catch(() => {
        toast.error("L'utilisateur n'existe pas ou l'adresse mail est incorrecte")
    }) ;
  }

  return (

    <>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={changePassword}>
      {({ isSubmitting }) => (
          <Form className='p-3 mx-auto w-fit-content login-form mt-5'>
          <div className="form-group ">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control"/>
            <ErrorMessage name="email" component="div" />
          </div>
          <div className='error-message-login mt-3 text-danger'></div>
          <button type="submit" className="btn btn-primary mt-4">
            Envoyer un mail de réinitialisation
          </button>
        </Form>
      )}
    </Formik>
      </>
      );
  };
export default ChangePassword;