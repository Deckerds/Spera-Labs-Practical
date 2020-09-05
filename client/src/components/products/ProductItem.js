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
    };

    return (
        <div className="card p-item bg-light mt-2">
            <div className="card-body">
                <div className="h5 text-primary text-center">{name} {' '}
                </div>
                <ul className="list-unstyled pl-0 pt-1">
                    <li>
                        {description && (<p><span className="font-weight-bold">Description:</span> {description}</p>)
                        }
                    </li>
                    <li>
                        {quantity && (<p><span className="font-weight-bold">Quantity:</span> {quantity}</p>)
                        }
                    </li>
                </ul>
            </div>
            <div className="card-footer">
                <p className="d-flex justify-content-between">
                    <button className="btn btn-dark" onClick={() => setCurrent(product)}>Edit</button>
                    <button className="btn btn-danger  " onClick={onDelete}>Delete</button>
                </p>
            </div>
        </div >
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItem;