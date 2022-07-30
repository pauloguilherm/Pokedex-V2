import {useCallback, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Form} from '@unform/web';
import {toast} from 'react-toastify';
import {PropTypes} from 'prop-types';

import Loading from '@Components/Loading';
import {Input} from '@Components/Form';
import {login} from '@Hooks/user';
import {AppContext} from '@Components/Container';

export default function SignIn () {
    const [loading, setLoading] = useState(false);
    const {setToken} = useContext(AppContext);
    const navigate = useNavigate();
    const handleSubmitForm = useCallback(async(payload) => {
        setLoading(true);
        const {data} = await login(payload);
        setLoading(false);
        if(!data.success){
            return toast.error(data.message);
        };
        setToken(data.token);
        navigate("/");
        return toast.success(data.message);
    }, []);

    return (
        <div className="container-user">
            <Form onSubmit={handleSubmitForm}>
                <h1>Login</h1>
                <Input name="email" label="Email" type="email"/>
                <Input type="password" name="password" label="Password"/>
                <Button>{loading ? <Loading /> : 'Submit'}</Button>
            </Form>
        </div>
    )
};

SignIn.propTypes = {}