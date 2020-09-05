import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'User Already Exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, email, phone, address, password, password2 } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || phone === '' || address === '' || password === '' || password2 === '') {
            setAlert('Please Enter All Fields', 'danger');
        } else if (password.length < 8) {
            setAlert('Password Must Be atleast 8 characters long', 'danger');
            clearErrors();
        } else if (password !== password2) {
            setAlert('Passwords do not match!', 'danger')
        } else {
            register({
                firstName,
                lastName,
                email,
                phone,
                address,
                password
            });
        }
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center h-100">
                <div className="card p-2 pb-4">
                    <div className="card-header">
                        <h2 className="text-center">Account <span className="text-primary">Register</span></h2>
                    </div>
                    <form onSubmit={onSubmit} className="mt-2">
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="firstName">First Name</label>
                            <input className="form-control" type="text" name="firstName" value={firstName} onChange={onChange} placeholder="John" />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="lastName">Last Name</label>
                            <input className="form-control" type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Doe" />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={onChange} placeholder="email@example.com" />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="phone">Phone</label>
                            <input className="form-control" type="text" name="phone" value={phone} onChange={onChange} placeholder="+94123456789" />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="address">Address</label>
                            <input className="form-control" type="text" name="address" value={address} onChange={onChange} placeholder="Colombo 05..." />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="password2">Confirm Password</label>
                            <input className="form-control" type="password" name="password2" value={password2} onChange={onChange} />
                        </div>
                        <input type="submit" value="Register" className="btn btn-theme white-txt btn-block" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;