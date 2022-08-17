import {useEffect} from 'react';

export default function usePreventForm({formRef}){

    useEffect(()=> {
        document.body.addEventListener('keypress', function (event) {
            const {key} = event;
            if(key === 'Enter'){
                event.preventDefault();
                formRef.current?.submitForm();
            };
        });
    }, []);
}