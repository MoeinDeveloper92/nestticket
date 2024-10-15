import React from 'react'
import useForm from '../hooks/useForm'
import { FaSignInAlt } from "react-icons/fa"
import InputComponent from '../components/InputComponent'
const Register = () => {
    const { values, handleChange, resetForm } = useForm({ email: "", password: "" })
    const { email, password } = values

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />
                    Login
                </h1>
                <p>Please Login to your account!</p>
                <section className="form">
                    <form onSubmit={handleSubmit}>
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
                        <div className="form-group">
                            <button type='submit' className='btn btn-block'>
                                Login
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}

export default Register