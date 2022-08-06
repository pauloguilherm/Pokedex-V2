import {useCallback, useState, useContext, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Form} from '@unform/web';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import Loading from '@Components/Loading';
import {Input} from '@Components/Form';
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
    }, []);

    return (
        <div className="container-user">
            <Form onSubmit={handleSubmitForm} ref={formRef}>
                <h1>Login</h1>
                <Input name="email" label="Email" type="email"/>
                <Input type="password" name="password" label="Password"/>
                <Button color="primary">{loading ? <Loading /> : 'Submit'}</Button>
            </Form>
        </div>
    )
};

SignIn.propTypes = {}