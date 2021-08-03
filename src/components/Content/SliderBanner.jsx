import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import {
    Box,
    makeStyles,
} from "@material-ui/core";
import Swiper from 'react-id-swiper';

const useStyles = makeStyles((theme) => ({
    actionIcon: {
        marginRight: theme.spacing(1)
    },
    root: {
    },
    swiperMainContainer: {
        '& .swiper-container': {
            maxWidth: '700px',
            height: '600px',
        },
        '& .swiper-pagination-bullet': {
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            backgroundColor: '#AAA',
            opacity: 0.9
        },
        '& .swiper-pagination-bullet-active': {
            backgroundColor: theme.palette.primary.main,
            opacity: 1
        }
    },
    swiperMainSlide: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
}));

export const SliderBanner = ({ images }) => {
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
        speed: 1500,
        loop: true,
        spaceBetween: 0,
        effect: 'fade',
        slidesPerView: 1,
        rebuildOnUpdate: true,
        observer: true,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
    }

    if (images.length > 1) {
        params.pagination = {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        };
    };

    return (
        <div
            ref={ref => connect(drag(ref))}
        >
            <div style={editingStyle}>
                <Box mb={5}>
                    <div className={classes.swiperMainContainer}>
                        <Swiper
                            {...params}
                        >
                            {images.map((image, idx) => {
                                return (
                                    <div key={`slide_main_${idx}`} style={{ backgroundColor: 'white' }}>
                                        <img className={classes.swiperMainSlide} src={image.url} />
                                    </div>
                                )
                            })}
                        </Swiper>
                    </div>
                </Box>
            </div>
        </div>
    )
}