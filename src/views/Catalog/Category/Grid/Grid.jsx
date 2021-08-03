import React from 'react';
import {
    Grid,
    Container,
    Box,
    Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Drawer from './Drawer/Drawer';
import ProductCard from 'src/components/ProductCard';

export default function GridProducts({ category, products, attributes, onPaginate, paginator, onFilter, filters }) {

    if (!products) {
        return <></>;
    }

    let withoutAttributes = category?.parent?.slug !== 'catalogo-de-imagens' && category?.parent?.slug !== 'galeria-de-artistas';
    let withoutPriceAndName = category?.parent?.slug === 'catalogo-de-imagens' || category?.parent?.slug === 'galeria-de-artistas';

    let hasFilter = (attributes && Object.keys(attributes).length > 0 && withoutAttributes);
    let hasProducts = (products && products.length > 0);

    return (
        <>
            <Container maxWidth="lg">

                {Object.keys(category).length > 0 && (
                    <section className="s-title-page">
                        <div className="container">
                            <div className="txt-result">
                                <span>Você está na categoria:</span>
                                {category.parent !== null && (
                                    <p>Você está em <strong>{category?.parent?.name}</strong>, na categoria:</p>
                                )}
                                <h3>{category?.name}</h3>
                            </div>
                        </div>
                    </section>
                )}

                <section className="s-categoria-quadros">
                    <div className="container">
                        {hasFilter && (
                            <div className="filter">
                                <Drawer products={products} attributes={attributes} onFilter={onFilter} filters={filters} />
                            </div>
                        )}
                        <div className="all-quadros">
                            {hasProducts && (
                                <>
                                    <div className="all">
                                        {products.map((item, i) => (
                                            <ProductCard product={item} index={i} withoutPriceAndName={withoutPriceAndName} />
                                        ))}
                                    </div>
                                    {paginator && paginator.pageLast > 1 && (
                                        <>
                                            <Box
                                                display='flex'
                                                justifyContent='center'
                                                mt={3}
                                            >
                                                <Pagination
                                                    count={paginator.pageLast}
                                                    page={paginator.pageCurrent}
                                                    color="secondary"
                                                    onChange={onPaginate}
                                                />
                                            </Box>
                                        </>
                                    )}
                                </>
                            )}
                            {!hasProducts && (
                                <Grid item md={12} xs={12} >
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        justifyContent='center'
                                        mb={2}
                                        mt={1}
                                    >
                                        <Typography
                                            align="center"
                                            variant="h2"
                                            gutterBottom
                                        >
                                            Nenhum produto encontrado.
                                        </Typography>
                                        <Typography
                                            align="center"
                                            variant="subtitle1"
                                        >
                                            Infelizmente não encontramos nenhum produto para a sua busca.
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
}
