import React from 'react'
import useForm from '../hooks/useForm'
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import InputComponent from '../components/InputComponent'

const Register = () => {
    const { values, handleChange, resetForm } = useForm({ name: "", email: "", password: "", password2: "" })
    const { name, email, password, password2 } = values

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords do not Match!")
        } else {
            alert("You submitted the form!")
            //it resets the form!
            resetForm()
        }
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />
                    Regiter
                </h1>
                <p>Please create an account</p>
                <section className="form">
                    <form onSubmit={handleSubmit}>
                        <InputComponent
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            handleChange={handleChange}
                            value={name}
                            required={true}
                        />
                        <InputComponent
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            handleChange={handleChange}
                            value={email}
                            required={true}
                        />
                        <InputComponent
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            handleChange={handleChange}
                            value={password}
                            required={true}
                        />
                        <InputComponent
                            id="password2"
                            type="password"
                            placeholder="Confimation Password"
                            name="password2"
                            handleChange={handleChange}
                            value={password2}
                            required={true}
                        />
                        <div className="form-group">
                            <button type='submit' className='btn btn-block'>
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}

export default Register