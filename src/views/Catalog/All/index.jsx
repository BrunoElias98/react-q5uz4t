import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    makeStyles,
    Box,
    Container,
    Typography,
    Grid,
} from '@material-ui/core';
import Page from 'src/components/Page';
import { v4 as uuidv4 } from 'uuid';
import { addLoadingGlobal, removeLoadingGlobal } from 'src/actions';
import ManagerApi from 'src/services/managerApi';
import ProductGrid from './Grid/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(5),
    }
}));

export default function Products({ history }) {
    const store = useSelector((state) => state.interface.store);
    const classes = useStyles();
    const dispatch = useDispatch();
    let myRef = useRef(null);
    const [filters, setFilters] = useState(false);
    const attributes = useSelector((state) => state.interface.globalData.attributesMenu);
    const [paginator, setPaginator] = useState({ sortOrder: { finalPrice: 'ASC' } });
    const [products, setProducts] = useState(false);
    const productsApi = new ManagerApi('/catalog/product');

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
    }

    const handleFilter = (filter) => {
        setPaginator({
            ...paginator,
            pageCurrent: 1,
        });
        setFilters(filter);
    }

    const fetchProducts = () => {
        const requestId = uuidv4();

        let params = {
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
        productsApi.getList(params).then((response) => {
            if (response.data.success) {
                let newPaginator = {
                    ...response.data.paginator,
                    sortOrder: { ...paginator.sortOrder }
                }
                setProducts(response.data.content);
                setPaginator(newPaginator);
            }
        }).catch((error) => {
        }).then(() => {
            dispatch(removeLoadingGlobal(requestId));
        });
    };

    useEffect(() => {
        let filtersParams = history.location.search
            .slice(1)
            .split('&')
            .map(p => p.split('='))
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        let newFilter = {};
        attributes.map((attribute) => {
            if (filtersParams[attribute.code]) {
                attribute.options.map((option) => {
                    if (option.slug == filtersParams[attribute.code]) {
                        newFilter[attribute.id] = option.id;
                    }
                });
            }
        });
        setFilters(newFilter);

    }, [history.location.search]);


    useEffect(() => {
        if (filters !== false && attributes !== false) {
            fetchProducts();
        }
    }, [filters]);

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth' });

    return (
        <Page
            className={classes.root}
            title={"Catálogo"}
        >
            <section className="s-title-page">
                <div className="container">
                    <div className="txt-result">
                        <h3>Kit de Quadros</h3>
                    </div>
                </div>
            </section>
            <Box mt={5} ref={myRef}>
                <ProductGrid
                    title="Encontre seu kit por:"
                    description=""
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
