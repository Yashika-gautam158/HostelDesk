import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserService from "../../services/UserService";

import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({

        email: "",

        password: ""

    });

    function handleChange(e) {

        setLogin({

            ...login,

            [e.target.name]: e.target.value

        });

    }

    async function loginUser(e) {

        e.preventDefault();

        try {

            const user = await UserService.login(login);

            toast.success("Login Successful");

            if (user.userType == 1) {

                navigate("/admin");

            }

            else if (user.userType == 2) {

                navigate("/student");

            }

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="text-center mb-4">

                    <h1>Hostel Desk</h1>

                    <p>Hostel Management System</p>

                </div>

                <form onSubmit={loginUser}>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={login.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-4">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={login.password}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                    >

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}