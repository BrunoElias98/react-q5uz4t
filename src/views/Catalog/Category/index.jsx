import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    makeStyles,
    Box,
} from '@material-ui/core';
import Page from 'src/components/Page';
import { v4 as uuidv4 } from 'uuid';
import { addLoadingGlobal, removeLoadingGlobal } from 'src/actions';
import ManagerApi from 'src/services/managerApi';
import ProductGrid from './Grid/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(5),
    },
    header: {
        paddingTop: theme.spacing(3),
    }
}));

export default function Products({ category }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let myRef = useRef(null);
    const [filters, setFilters] = useState({});
    const [paginator, setPaginator] = useState({ sortOrder: { finalPrice: 'ASC' } });
    const [products, setProducts] = useState(false);
    const [attributes, setAttributes] = useState([]);

    const searchQueryApi = new ManagerApi('/search/query');

    const handlePaginator = (event, page) => {
        setPaginator({
            ...paginator,
            pageCurrent: page,
        });
        setFilters({ ...filters });

        executeScroll();
    };

    const handleSortOrder = (sortOrder) => {
        setPaginator({
            ...paginator,
            sortOrder: sortOrder
        });

        setFilters({ ...filters });
    };

    const handleFilter = (filter) => {
        setPaginator({
            ...paginator,
            pageCurrent: 1,
        });
        setFilters(filter);
    };

    const fetchProducts = () => {
        const requestId = uuidv4();

        let params = {
            category: category.id,
            attributes: {
                ...filters
            },
            paginator: {
                pageItemsPerPage: 12,
                pageCurrent: paginator.pageCurrent,
                sortOrder: {
                    saleable: 'DESC',
                    ...paginator.sortOrder,
                }
            }
        }

        dispatch(addLoadingGlobal(requestId));
        searchQueryApi.getList(params).then((response) => {
            if (response.data.success) {
                const { attributes, products, paginator } = response.data.content;
                let newPaginator = {
                    ...paginator,
                    sortOrder: { ...paginator.sortOrder }
                }
                setAttributes(attributes);
                setProducts(products);
                setPaginator(newPaginator);
            }
        }).catch((error) => {
            console.log(error)
        }).then(() => {
            dispatch(removeLoadingGlobal(requestId));
        });
    };

    useEffect(() => {
        setFilters({});
    }, [category]);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth' });
    
    return (
        <Page
            className={classes.root}
            title={category.name}
        >
            <Box mt={5} ref={myRef}>
                <ProductGrid
                    category={category}
                    products={products}

                    attributes={attributes}

                    onPaginate={handlePaginator}
                    paginator={paginator}

                    onSortOrder={handleSortOrder}

                    onFilter={handleFilter}
                    filters={filters}
                />

            </Box>
        </Page>
    )
}
