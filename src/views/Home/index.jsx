import React from 'react';
import Swiper from 'react-id-swiper';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Link,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateFrames from './CreateFrames';
import Evidences from './Evidences';

import img from 'src/theme/img/img-banner.jpg';
import imgColecao1 from 'src/theme/img/colecao-01.jpg';
import imgColecao2 from 'src/theme/img/colecao-02.jpg';
import imgColecao3 from 'src/theme/img/colecao-03.jpg';
import imgArrowBlack from 'src/theme/img/arrow-right-black.svg';
import imgProd from 'src/theme/img/img-prod-prontos.jpg';
import imgExpand from 'src/theme/img/img-expanda.jpg';

export default function Index() {
    let images = [
        { id: 1, url: imgProd },
        { id: 2, url: imgProd },
        { id: 3, url: imgProd }
    ];

    let params = {
        // preloadImages: false,
        speed: 2500,
        // loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        rebuildOnUpdate: true,
        observer: true,
        centeredSlides: true,
        effect: 'slide',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: images.length > 1 && ".swiper-button-next",
            prevEl: images.length > 1 && ".swiper-button-prev"
        },
    };

    return (
        <Page
            title=""
        >
            <Box mb={5}>
                <section className="s-banner-featured">
                    <div className="container">
                        <div className="area">
                            <figure>
                                <img src={img} alt="" />
                            </figure>
                            <div className="text">
                                <div className="cont">
                                    <span>CRIE E PERSONALIZE</span>
                                    <h1>SEUS PRÓPRIOS QUADROS</h1>
                                    <p>
                                        Coloque aquelas fotos do seu celular ou do computador na parede,
                                        em forma de um lindo quadro personalizado!
                                    </p>
                                    <Link component={RouterLink} to="/comece-seu-quadro">
                                        começar meu quadro
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="s-colecoes-destaques">
                    <div className="container">
                        <div className="cont">
                            <div className="box">
                                <h3>Algumas coleções merecedoras de destaque</h3>
                                <p>
                                    Dá uma olhada nestas categorias de imagens para você escolher qual
                                    se encaixa melhor no seu ambiente:
                                </p>
                            </div>
                            <ul>
                                <li>
                                    <Link component={RouterLink} to="/categorias" className="card-colecao">
                                        <div className="foto">
                                            <img src={imgColecao1} alt="" />
                                        </div>
                                        <div className="info">
                                            <span>frases e citações </span>
                                            <img src={imgArrowBlack} alt="" />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link component={RouterLink} to="/categorias" className="card-colecao">
                                        <div className="foto">
                                            <img src={imgColecao2} alt="" />
                                        </div>
                                        <div className="info">
                                            <span>escandinavo</span>
                                            <img src={imgArrowBlack} alt="" />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link component={RouterLink} to="/categorias" className="card-colecao">
                                        <div className="foto">
                                            <img src={imgColecao3} alt="" />
                                        </div>
                                        <div className="info">
                                            <span>ZEN</span>
                                            <img src={imgArrowBlack} alt="" />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="s-prod-expandir">
                    <div className="container">
                        <div className="cont">
                            <div className="left">
                                <div className="title">
                                    <h2>Conheça também nossos produtos prontos</h2>
                                    <p>Nós também temos diversas opções prontas para você decorar seu ambiente com estilo.</p>
                                </div>
                                <div className="area-slide">
                                    <div className="circle">
                                        <div className="slide-produtos-prontos">
                                            <Swiper {...params}>
                                                {images.map((image, idx) => (
                                                    <div key={`slide_main_${idx}`}>
                                                        <a className="area-prod-prontos">
                                                            <div className="foto">
                                                                <img src={image.url} alt="" />
                                                            </div>
                                                            <Box mb={3}>
                                                                <h4>quadro porta rolhas</h4>
                                                            </Box>
                                                        </a>
                                                    </div>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="title">
                                    <h2>Faltou espaço no quadro? Expanda!</h2>
                                    <p>Nossos conjuntos ampliam a visão da sua imagem em 3, 4 e 5 painéis para que nenhum detalhe fique de fora!
                                </p>
                                </div>
                                <Link component={RouterLink} to="/kit-quadros" className="card">
                                    <div className="foto">
                                        <img src={imgExpand} alt="" />
                                    </div>
                                    <div className="info">
                                        <span>kit quadros</span>
                                        <img src={imgArrowBlack} alt="" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <CreateFrames />
                <Evidences />
            </Box>
        </Page>
    )
}
