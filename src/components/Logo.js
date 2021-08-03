import React from 'react';
import { useSelector } from 'react-redux';

function Logo(props) {

    const store = useSelector((state) => state.interface.store);

    if(!store.name) {
        return <></>;
    }

    return (
        <img
            alt={ store.name }
            src={ store.logo }
            {...props}
        />
    );
}

export default Logo;
