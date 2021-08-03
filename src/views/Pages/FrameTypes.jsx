import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'src/components/Page';
import { Link } from '@material-ui/core';

import canvas from 'src/theme/img/thumb-canvas-lg.jpg';
import moldura from 'src/theme/img/thumb-moldura-lg.jpg';
import poster from 'src/theme/img/thumb-poster-lg.jpg';

export default function Index() {
    return (
        <Page
            title="Tipos de Quadros"
        >
            <section className="s-tipo-quadros">
                <div className="container">
                    <div className="title">
                        <h2>Tipos de Quadros</h2>
                    </div>
                    <ul className="list-tipos">
                        <li>
                            <div className="circle">
                                <img src={canvas} alt="" />
                            </div>
                            <h3>QUADRO EM CANVAS</h3>
                            <Link component={RouterLink} to="/canvas" className="btn">CLIQUE PARA SABER MAIS</Link>
                        </li>
                        <li>
                            <div className="circle">
                                <img src={moldura} alt="" />
                            </div>
                            <h3>QUADRO COM MOLDURA</h3>
                            <a href="" className="btn">CLIQUE PARA SABER MAIS</a>
                        </li>
                        <li>
                            <div className="circle">
                                <img src={poster} alt="" />
                            </div>
                            <h3>PÔSTER</h3>
                            <a href="" className="btn">CLIQUE PARA SABER MAIS</a>
                        </li>
                    </ul>
                </div>
            </section>
        </Page>
    )
}
