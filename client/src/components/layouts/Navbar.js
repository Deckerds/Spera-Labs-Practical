import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import '../../App.css';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user, deleteUser } = authContext;
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;

    const onLogout = () => {
        logout();
    };

    const onDelete = () => {
        deleteUser(user._id)
        setAlert('Deleted Successfully', 'danger');
    };

    const authLinks = (
        <Fragment>
            <li className="nav-item nav-link hello-txt mr-1">
                <Link className="nav-link white-txt" to='/'>Hello, {user && user.firstName}</Link></li>
            <li className="nav-item nav-link">
                <a className="nav-link white-txt mr-1" href={user && `/update/${user._id}`}>Update</a>
            </li>
            <li className="nav-item nav-link">
                <a className="nav-link white-txt mr-1" href="#!" onClick={onDelete}>Delete</a>
            </li>
            <li className="nav-item nav-link">
                <a className="nav-item nav-link" onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt white-txt mr-1"></i><span className="hide-sm white-txt">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link white-txt" to='/register'>Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link white-txt" to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <h3 className="text-light"><i className={icon} /> {title}</h3>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navUl">
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Practical CRUD',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;