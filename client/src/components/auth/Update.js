import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';


const Update = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { clearErrors, loadUser, error, isAuthenticated } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, phone, address, password, password2 } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (firstName === '' || lastName === '' || phone === '' || address === '' || password === '' || password2 === '') {
            setAlert('Please Enter All Fields', 'danger');
        } else if (password.length < 8) {
            setAlert('Password Must Be atleast 8 characters long', 'danger');
            clearErrors();
        } else if (password !== password2) {
            setAlert('Passwords do not match!', 'danger')
        } else if (!isAuthenticated) {
            props.history.push('/login');
            setAlert('You need to logged into update a User', 'danger');
        } else {
            const updateUser = async () => {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const res = await axios.get('/api/auth');
                const data = await res.data;
                await axios.put(`/api/users/${data._id}`, user, config);
            }
            updateUser();
            if (error === null) {
                setAlert('Successfully Updated', 'success');

            };
        }
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center h-100">
                <div className="card p-2 pb-4">
                    <div className="card-header">
                        <h2 className="text-center">Account <span className="text-primary">Update</span></h2>
                    </div>
                    <form onSubmit={onSubmit} className="mt-2">
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="firstName">First Name</label>
                            <input className="form-control" type="text" name="firstName" value={firstName} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="lastName">Last Name</label>
                            <input className="form-control" type="text" name="lastName" value={lastName} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="phone">Phone</label>
                            <input className="form-control" type="text" name="phone" value={phone} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="address">Address</label>
                            <input className="form-control" type="text" name="address" value={address} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label className="font-weight-bold" htmlFor="password2">Confirm Password</label>
                            <input className="form-control" type="password" name="password2" value={password2} onChange={onChange} />
                        </div>
                        <input type="submit" value="Update" className="btn btn-theme white-txt btn-block" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update;