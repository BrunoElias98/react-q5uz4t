import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addLoadingGlobal, removeLoadingGlobal } from 'src/actions';

import ManagerApi from 'src/services/managerApi';

import CategoryView from './Category';
import ProductView from './Product';
import ContentView from 'src/views/Content';
import Error404 from 'src/views/Error404';

export default function Products({ match, ...rest }) {
    const path = match.params[0].substr(1);

    const dispatch = useDispatch();
    const [component, setComponent] = useState(false);

    const routerApi = new ManagerApi('/router');

    const fetchRoute = async () => {

        if (!path) {
            return;
        }

        const filters = { url: path };

        const requestId = uuidv4();
        dispatch(addLoadingGlobal(requestId));

        let router = await routerApi.getList(filters);

        if (router.data.content.type === 'product') {
            setComponent(<ProductView product={router.data.content.product} {...rest} />);
        } else if (router.data.content.type === 'category') {
            setComponent(<CategoryView category={router.data.content.category} {...rest} />);
        } else if (router.data.content.type === 'content') {
            setComponent(<ContentView content={router.data.content.content} {...rest} />);
        } else {
            setComponent(<Error404 />);
        }

        dispatch(removeLoadingGlobal(requestId));

    };

    useEffect(() => {
        fetchRoute();
    }, [path]);

    if (component === false) {
        return (<></>);
    }

    return component;

}
