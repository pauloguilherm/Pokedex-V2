import {useCallback, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';


import {Form} from '@unform/web';
import {Input} from '@Components/Form';
import {registerUser} from '@Hooks/user';
import Loading from '@Components/Loading';


import schema from './schema';

export default function SignUp () {
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmitForm = useCallback(async(payload) => {
        setLoading(true);
        try{
            await schema.validate(payload, {abortEarly: false});
            const {data} = await registerUser(payload);
            if(data?.success) {
                navigate('/Auth/signIn');
                return toast.success('user created');
            };
            return toast.error("Username or email already registered");
        }catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                  validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            };
        }finally{
            setLoading(false);
        }
    }, [registerUser, schema]);

    return (
        <div className="container-user">
            <Form onSubmit={handleSubmitForm} ref={formRef}>
                <h1>Register</h1>
                <Input name="name" label="Usuario" type="text"/>
                <Input name="email" label="Email" type="email"/>
                <Input type="password" name="password" label="Password"/>
                <Button color="primary">{loading ? <Loading /> : 'Submit'}</Button>
            </Form>
        </div>
    )
};

SignUp.propTypes = {}