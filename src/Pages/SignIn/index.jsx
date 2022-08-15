import {useCallback, useState, useContext, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Form} from '@unform/web';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import Loading from '@Components/Loading';
import {CustomInput} from '@Components/Form';
import {login} from '@Hooks/user';
import {AppContext} from '@Components/Container';
import {saveUser} from '@Auth';
import schema from './schema';

export default function SignIn () {
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const {setUserData} = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmitForm = useCallback(async(payload) => {
        setLoading(true);
        try{
            await schema.validate(payload, {abortEarly: false});
            const {data} = await login(payload);
            setLoading(false);
            if(!data?.success){
                return toast.error("Email or password incorrect");
            };
            saveUser(data);
            setUserData(data.user);
            navigate("/app");
            return toast.success(data.message);
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
    }, [navigate, saveUser, setUserData]);

    return (
        <div className="container-user">
            <Form onSubmit={handleSubmitForm} ref={formRef}>
                <h1>Login</h1>
                <CustomInput name="email" label="Email" type="email"/>
                <CustomInput type="password" name="password" label="Password"/>
                <Button type="submit" color="primary" size="small" >{loading ?  <Loading /> : 'Submit'}</Button>
                <div className="d-flex justify-content-end w-100">
                    <Link to="../app/Auth/signUp">Create account</Link>
                </div>
            </Form>
        </div>
    )
};

SignIn.propTypes = {}