import React, { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';

function Loader(props) {
    return (
        <Fragment>
            {props.isVisible &&
                <div className="text-center m-2">
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                </div>
            }
        </Fragment>
    );
}

export default Loader;