import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'src/components/Page';
import { Link } from '@material-ui/core';

import canvas from 'src/theme/img/thumb-canvas-lg.jpg';
import moldura from 'src/theme/img/thumb-moldura-lg.jpg';
import poster from 'src/theme/img/thumb-poster-lg.jpg';

import portaRolha from "src/theme/img/porta-rolhas.jpg";
import minhasViagens from "src/theme/img/minhas-viagens.jpg";
import portaTampinhas from "src/theme/img/porta-tampinhas.jpg";
import minhasLembranca from "src/theme/img/minhas-lembrancas.jpg";

export default function Index() {
    const [frameType, setFrameType] = useState({ canvas: false, frame: false, poster: false });
    const [productType, setProductType] = useState({ corkHolder: false, myTravels: false, capHolder: false, myMemories: false });

    const handleSetProductType = (type) => {
        if (type === 'corkHolder') {
            setProductType({ corkHolder: true, myTravels: false, capHolder: false, myMemories: false });
        } else if (type === 'myTravels') {
            setProductType({ corkHolder: false, myTravels: true, capHolder: false, myMemories: false });
        } else if (type === 'capHolder') {
            setProductType({ corkHolder: false, myTravels: false, capHolder: true, myMemories: false });
        } else {
            setProductType({ corkHolder: false, myTravels: false, capHolder: false, myMemories: true });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        if (name === 'canvas') {
            setFrameType({ canvas: true, frame: false, poster: false });
        } else if (name === 'frame') {
            setFrameType({ canvas: false, frame: true, poster: false });
        } else {
            setFrameType({ canvas: false, frame: false, poster: true });
        }
    };

    return (
        <Page
            title="Preços dos Quadros"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Preços dos Quadros</h2>
                    </div>
                </div>
            </section>

            <section className="s-geral-valores">
                <div className="item">
                    <div className="lista-tipo">
                        <h4>ESCOLHA O TIPO DE QUADRO:</h4>
                        <div className="responsive">
                            <div className="all-tipos">
                                <div className={frameType.canvas ? 'item-precos active' : 'item-precos'}>
                                    <div className="image">
                                        <img src={canvas} alt="" />
                                    </div>
                                    <strong>QUADRO EM CANVAS</strong>
                                    <select id="js-select-canvas" name='canvas' onChange={(e) => handleChange(e)}>
                                        <option value="" selected>Selecione um tipo:</option>
                                        <option value="Panorâmico">Panorâmico</option>
                                        <option value="Quadrado">Quadrado</option>
                                        <option value="Retangular">Retangular</option>
                                    </select>
                                </div>
                                <div className="item-precos" className={frameType.frame ? 'item-precos active' : 'item-precos'}>
                                    <div className="image">
                                        <img src={moldura} alt="" />
                                    </div>
                                    <strong>QUADRO COM MOLDURA</strong>
                                    <select id="js-select-moldura" name='frame' onChange={handleChange}>
                                        <option value="" selected disabled>Selecione um tipo:</option>
                                        <option value="Panorâmico">Panorâmico</option>
                                        <option value="Quadrado">Quadrado</option>
                                        <option value="Retangular">Retangular</option>
                                    </select>
                                </div>
                                <div className="item-precos" className={frameType.poster ? 'item-precos active' : 'item-precos'}>
                                    <div className="image">
                                        <img src={poster} alt="" />
                                    </div>
                                    <strong>PÔSTER</strong>
                                    <select id="js-select-poster" name='poster' onChange={handleChange}>
                                        <option value="" selected disabled>Selecione um tipo:</option>
                                        <option value="Panorâmico">Panorâmico</option>
                                        <option value="Quadrado">Quadrado</option>
                                        <option value="Retangular">Retangular</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="all-precos" style={{ display: frameType.canvas || frameType.frame || frameType.poster ? 'block' : 'none' }}>
                            <div className="todos-valores js-precos-canvas" style={{ display: frameType.canvas ? 'block' : 'none' }}>
                                <div className="area-tabela-preco js-valor-panoramico active">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                                <div className="area-tabela-preco js-valor-quadrado">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                                <div className="area-tabela-preco js-valor-retangular">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                            </div>
                            <div className="todos-valores js-precos-moldura" style={{ display: frameType.frame ? 'block' : 'none' }}>
                                <div className="area-tabela-preco js-valor-panoramico active">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                                <div className="area-tabela-preco js-valor-quadrado">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                                <div className="area-tabela-preco js-valor-retangular">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                            </div>
                            <div className="todos-valores js-precos-poster" style={{ display: frameType.poster ? 'block' : 'none' }}>
                                <div className="area-tabela-preco js-valor-panoramico active">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                                <div className="area-tabela-preco js-valor-quadrado">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                                <div className="area-tabela-preco js-valor-retangular">
                                    <div className="tabela">
                                        <div className="head">
                                            <strong>Tamanho</strong>
                                            <strong>A partir de</strong>
                                        </div>
                                        <div className="body">
                                            <div className="line">
                                                <span>32 x 24 cm</span>
                                                <span>R$ 89,99</span>
                                            </div>
                                            <div className="line">
                                                <span>40 x 30 cm</span>
                                                <span>R$ 119,99</span>
                                            </div>
                                            <div className="line">
                                                <span>48 x 36 cm</span>
                                                <span>R$ 149,99</span>
                                            </div>
                                            <div className="line">
                                                <span>60 x 45 cm</span>
                                                <span>R$ 189,99</span>
                                            </div>
                                            <div className="line">
                                                <span>80 x 60 cm</span>
                                                <span>R$ 259,99</span>
                                            </div>
                                            <div className="line">
                                                <span>100 x 75 cm</span>
                                                <span>R$ 309,99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="lista-tipo">
                        <h4>ESCOLHA O TIPO DE PRODUTO:</h4>
                        <ul className="nav-tabs list-tipo-produto">
                            <li className={productType.corkHolder && 'active'} onClick={() => handleSetProductType('corkHolder')} style={{ cursor: 'pointer' }}>
                                <a>
                                    <div className="image">
                                        <img src={portaRolha} alt="" />
                                    </div>
                                    <strong>PORTA ROLHAS</strong>
                                </a>
                            </li>
                            <li className={productType.myTravels && 'active'} onClick={() => handleSetProductType('myTravels')} style={{ cursor: 'pointer' }}>
                                <a>
                                    <div className="image">
                                        <img src={minhasViagens} alt="" />
                                    </div>
                                    <strong>MINHAS VIAGENS</strong>
                                </a>
                            </li>
                            <li className={productType.capHolder && 'active'} onClick={() => handleSetProductType('capHolder')} style={{ cursor: 'pointer' }}>
                                <a>
                                    <div className="image">
                                        <img src={portaTampinhas} alt="" />
                                    </div>
                                    <strong>PORTA TAMPINHAS</strong>
                                </a>
                            </li>
                            <li className={productType.myMemories && 'active'} onClick={() => handleSetProductType('myMemories')} style={{ cursor: 'pointer' }}>
                                <a>
                                    <div className="image">
                                        <img src={minhasLembranca} alt="" />
                                    </div>
                                    <strong>MINHAS LEMBRANÇAS</strong>
                                </a>
                            </li>
                        </ul>
                        <div
                            className="tab-content"
                            style={{ display: productType.corkHolder || productType.myTravels || productType.capHolder || productType.myMemories ? 'block' : 'none' }}
                        >
                            <div className="tab-pane" style={{ display: productType.corkHolder ? 'block' : 'none' }}>
                                <div className="tabela">
                                    <div className="head">
                                        <strong>Tamanho</strong>
                                        <strong>A partir de</strong>
                                    </div>
                                    <div className="body">
                                        <div className="line">
                                            <span>32 x 24 cm</span>
                                            <span>R$ 89,99</span>
                                        </div>
                                        <div className="line">
                                            <span>40 x 30 cm</span>
                                            <span>R$ 119,99</span>
                                        </div>
                                        <div className="line">
                                            <span>48 x 36 cm</span>
                                            <span>R$ 149,99</span>
                                        </div>
                                        <div className="line">
                                            <span>60 x 45 cm</span>
                                            <span>R$ 189,99</span>
                                        </div>
                                        <div className="line">
                                            <span>80 x 60 cm</span>
                                            <span>R$ 259,99</span>
                                        </div>
                                        <div className="line">
                                            <span>100 x 75 cm</span>
                                            <span>R$ 309,99</span>
                                        </div>
                                    </div>
                                </div>
                                <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                            </div>
                            <div className="tab-pane" style={{ display: productType.myTravels ? 'block' : 'none' }}>
                                <div className="tabela">
                                    <div className="head">
                                        <strong>Tamanho</strong>
                                        <strong>A partir de</strong>
                                    </div>
                                    <div className="body">
                                        <div className="line">
                                            <span>32 x 24 cm</span>
                                            <span>R$ 89,99</span>
                                        </div>
                                        <div className="line">
                                            <span>40 x 30 cm</span>
                                            <span>R$ 119,99</span>
                                        </div>
                                        <div className="line">
                                            <span>48 x 36 cm</span>
                                            <span>R$ 149,99</span>
                                        </div>
                                        <div className="line">
                                            <span>60 x 45 cm</span>
                                            <span>R$ 189,99</span>
                                        </div>
                                        <div className="line">
                                            <span>80 x 60 cm</span>
                                            <span>R$ 259,99</span>
                                        </div>
                                        <div className="line">
                                            <span>100 x 75 cm</span>
                                            <span>R$ 309,99</span>
                                        </div>
                                    </div>
                                </div>
                                <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                            </div>
                            <div className="tab-pane" style={{ display: productType.capHolder ? 'block' : 'none' }}>
                                <div className="tabela">
                                    <div className="head">
                                        <strong>Tamanho</strong>
                                        <strong>A partir de</strong>
                                    </div>
                                    <div className="body">
                                        <div className="line">
                                            <span>32 x 24 cm</span>
                                            <span>R$ 89,99</span>
                                        </div>
                                        <div className="line">
                                            <span>40 x 30 cm</span>
                                            <span>R$ 119,99</span>
                                        </div>
                                        <div className="line">
                                            <span>48 x 36 cm</span>
                                            <span>R$ 149,99</span>
                                        </div>
                                        <div className="line">
                                            <span>60 x 45 cm</span>
                                            <span>R$ 189,99</span>
                                        </div>
                                        <div className="line">
                                            <span>80 x 60 cm</span>
                                            <span>R$ 259,99</span>
                                        </div>
                                        <div className="line">
                                            <span>100 x 75 cm</span>
                                            <span>R$ 309,99</span>
                                        </div>
                                    </div>
                                </div>
                                <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                            </div>
                            <div className="tab-pane" style={{ display: productType.myMemories ? 'block' : 'none' }}>
                                <div className="tabela">
                                    <div className="head">
                                        <strong>Tamanho</strong>
                                        <strong>A partir de</strong>
                                    </div>
                                    <div className="body">
                                        <div className="line">
                                            <span>32 x 24 cm</span>
                                            <span>R$ 89,99</span>
                                        </div>
                                        <div className="line">
                                            <span>40 x 30 cm</span>
                                            <span>R$ 119,99</span>
                                        </div>
                                        <div className="line">
                                            <span>48 x 36 cm</span>
                                            <span>R$ 149,99</span>
                                        </div>
                                        <div className="line">
                                            <span>60 x 45 cm</span>
                                            <span>R$ 189,99</span>
                                        </div>
                                        <div className="line">
                                            <span>80 x 60 cm</span>
                                            <span>R$ 259,99</span>
                                        </div>
                                        <div className="line">
                                            <span>100 x 75 cm</span>
                                            <span>R$ 309,99</span>
                                        </div>
                                    </div>
                                </div>
                                <Link component={RouterLink} to="/comece-seu-quadro" className="btn">COMEÇAR MEU QUADRO</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
