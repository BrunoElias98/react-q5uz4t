import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Page from 'src/components/Page';

import imgPhotoCreate from 'src/theme/img/foto-cria-quadro.jpg';
import imgPhotoModel from 'src/theme/img/foto-modelos-quadros.jpg';
import imgPhotoEffect from 'src/theme/img/foto-efeitos-imagens.jpg';
import imgPhotoBorder from 'src/theme/img/foto-bordas.jpg';
import imgPhotoPoster from 'src/theme/img/foto-poster.jpg';

export default function Index() {

    return (
        <Page
            title="Quadros Personalizados"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Quadros Personalizados</h2>
                    </div>
                </div>
            </section>

            <section className="s-quadros-personalizados">
                <div className="container">
                    <div className="text-featured">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgPhotoCreate} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Aqui você cria o seu quadro</h4>
                                <p>
                                    Criar seus quadros personalizados na On The Wall é muito fácil e divide-se basicamente em três passos.
                                    Para
                                    iniciar você pode optar por nos enviar uma foto própria ou escolher uma imagem de nosso banco, em seguida
                                    você selecionará o tipo de quadro e seus detalhes, o terceiro passo é definir o tamanho e pronto, agora é
                                    só
                                    esperar receber seu quadro exatamente como você sonhava no conforto da sua casa.
                                </p>
                                <Link component={RouterLink} to="/comece-seu-quadro">COMEÇAR MEU QUADRO</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgPhotoModel} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Modelos de quadros</h4>
                                <p>
                                    Para definir o formato do seu quadro personalizado você pode escolher entre quadro em canvas ou quadro com
                                    moldura.
                                </p>
                            </div>
                        </div>
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgPhotoEffect} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Efeitos em imagens</h4>
                                <p>
                                    Efeitos em imagensVocê pode personalizar a imagem selecionada com efeitos disponibilizados na nossa
                                    ferramenta de criação de quadros.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgPhotoBorder} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Bordas</h4>
                                <p>
                                    É possível selecionar bordas, tanto para o quadro em canvas quando para o quadro com moldura.
                                </p>
                            </div>
                        </div>
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgPhotoPoster} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Pôster</h4>
                                <p>
                                    É possível também selecionar a opção pôster. Você pode escolher entre papel fotográfico ou canvas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="s-info-tipo">
                <div className="container">
                    <h3>Escolha uma imagem em nossas categorias ou suba uma imagem sua e comece a personalizar o seu quadro em canvas.</h3>
                    <Link component={RouterLink} to="/comece-seu-quadro" className='btn-green'>COMEÇAR MEU QUADRO</Link>
                </div>
            </section>
        </Page>
    )
}
