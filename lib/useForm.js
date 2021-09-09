import { useEffect, useState } from "react";

function useForm(initial ={}) {
    const [inputs,setInputs] = useState(initial);
    const initialValue = Object.values(initial).join('');

    useEffect(() => {
        setInputs(initial);
    }, [initialValue]);

    function handleChange(e) {

        let {value,name,type} = e.target;
        if(type === 'number'){
            value = parseInt(value);
        }
        if(type === 'file'){
            [value] = e.target.files;//gives first thing out and keep it in value
        }
        setInputs({
            ...inputs,
            [name]:value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key,value])=>[key,'']));
        setInputs(blankState);
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    }
}

export default useForm