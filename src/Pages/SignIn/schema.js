import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
});

export default schema;