import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('usuario is a required field'),
    email: Yup.string().required(),
    password: Yup.string().required(),
});

export default schema;