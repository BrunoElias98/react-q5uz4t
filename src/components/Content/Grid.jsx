import React from "react";
import { Grid } from "@material-ui/core";
import { useNode, useEditor } from "@craftjs/core";

export const GridContainer = ({ children, spacing }) => {
    const { connectors: { connect, drag } } = useNode();

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    let editingStyle = {};
    if (enabled) {
        editingStyle = { width: '100%', marginLeft: '0.5px', marginBottom: '3px', marginTop: '3px', minHeight: '20px', border: '1px dashed #aaa', whiteSpace: 'pre-wrap' };
    }

    return (
        <Grid
            ref={ref => connect(drag(ref))}
            container
            spacing={spacing}
            style={editingStyle}
        >
            {children}
        </Grid>
    )
};

export const GridItem = ({ xs, sm, md, lg, children }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} ref={ref => connect(drag(ref))}>
            <div style={{ minWidth: '50px', minHeight: '50px', backgroundColor: '#fff' }}>
                {children}
            </div>
        </Grid>
    )
};