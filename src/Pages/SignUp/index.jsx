import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Form} from '@unform/web';
import {Input} from '@Components/Form';
import {registerUser} from '@Hooks/user';
import {toast} from 'react-toastify';
import {PropTypes} from 'prop-types';

export default function SignUp () {
    const navigate = useNavigate();
    const handleSubmitForm = useCallback(async(payload) => {
        const {data} = await registerUser(payload);
        if(data.success) {
            navigate('/signIn');
            return toast.success('user created');
        };
        return toast.error(data.message);
    }, []);

    return (
        <div className="container-user">
            <Form onSubmit={handleSubmitForm}>
                <h1>Register</h1>
                <Input name="name" label="Usuario" type="text"/>
                <Input name="email" label="Email" type="email"/>
                <Input type="password" name="password" label="Password"/>
                <Button >Submit</Button>
            </Form>
        </div>
    )
};

SignUp.propTypes = {}