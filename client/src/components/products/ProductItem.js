import React, { useContext } from 'react';
import '../../../src/App.css';
import ProductContext from '../../context/product/productContext';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {

    const productContext = useContext(ProductContext);
    const { deleteProduct, setCurrent, clearCurrent } = productContext;

    const { _id, name, description, quantity } = product;

    const onDelete = () => {
        deleteProduct(_id);
        clearCurrent();
    }

    return (
        <div className="card bg-light mt-2">
            <div className="card-body">
                <div className="h5 text-primary">{name} {' '}
                </div>
                <ul className="list-unstyled pl-0 pt-1">
                    <li>
                        {description && (<i className="fas fa-envelope-open"> {description}</i>)
                        }
                    </li>
                    <li>
                        {quantity && (<i className="fas fa-phone"> {quantity}</i>)
                        }
                    </li>
                </ul>
                <p>
                    <button className="btn btn-dark btn-sm mr-1" onClick={() => setCurrent(product)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                </p>
            </div>
        </div >
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItem;