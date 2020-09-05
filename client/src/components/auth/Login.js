import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'Invalid Credentials' || error === 'User does not Exist!') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please Fill in All Fields', 'danger');
        } else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center h-100">
                <div className="card p-2 pb-4">
                    <div className="card-header">
                        <h2 className="text-center">Account <span className="text-primary">Login</span></h2>
                    </div>
                    <form onSubmit={onSubmit} className="mt-2">
                        <div className="input-group form-group w-100">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input className="form-control" type="email" name="email" value={email} onChange={onChange} />
                        </div>
                        <div className="input-group form-group w-100">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input className="form-control" type="password" name="password" value={password} onChange={onChange} />
                        </div>
                        <input type="submit" value="Login" className="btn btn-theme white-txt btn-block" />
                    </form>
                    <p className="mt-4 text-center">Don't have an account?<Link to="/register"> Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;