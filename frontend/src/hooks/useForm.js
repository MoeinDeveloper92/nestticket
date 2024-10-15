import { useState } from "react";

const useForm = (initialState) => {
    const [values, setValues] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        console.log(initialState)
        setValues(initialState)
    }

    return {
        values,
        handleChange,
        resetForm
    }
}


export default useForm