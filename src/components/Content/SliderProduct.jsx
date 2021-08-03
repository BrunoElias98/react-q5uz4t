import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import { makeStyles } from "@material-ui/core";
import Swiper from 'react-id-swiper';
import ProductCard from 'src/components/ProductCard';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '10px'
    },
    swiperMainContainer: {
        '& .swiper-container': {
            height: '600px',
            maxWidth: '890px',
        },
    },
    swiperMainSlide: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        maxWidth: '213.333px',
        marginRight: '30px'
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    },
}));

export const SliderProduct = ({ products }) => {
    const classes = useStyles();
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

    let params = {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        loop: false,
        rebuildOnUpdate: true,
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    };

    return (
        <div
            ref={ref => connect(drag(ref))}
        >
            <div style={editingStyle}>
                <div className={classes.swiperMainContainer}>
                    <Swiper {...params}>
                        {products.length > 0 ? products.map((item, i) => (
                            <div className={classes.swiperMainSlide}>
                                <div key={i}>
                                    <ProductCard product={item} />
                                </div>
                            </div>
                        )) : []}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}