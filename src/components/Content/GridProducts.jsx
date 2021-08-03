import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import ProductCard from 'src/components/ProductCard';

export const GridProducts = ({ products }) => {
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged
    }));

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    let editingStyle = {};
    if (enabled) {
        editingStyle = { width: '100%', minHeight: '600px', border: '1px dashed #bbb' };
    }

    return (
        <div
            ref={ref => connect(drag(ref))}
        >
            <div style={editingStyle}>
                <Grid
                    container
                    spacing={3}
                >
                    {products.length > 0 ? products.map((item, i) => (
                        <Grid item md={3} xs={12}>
                            <div key={i}>
                                <ProductCard product={item} />
                            </div>
                        </Grid>
                    )) : []}
                </Grid>
            </div>
        </div >
    )
}