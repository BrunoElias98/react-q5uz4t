import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Page from 'src/components/Page';

import favoriteIcon from 'src/theme/img/icon-favorite-checked.svg';
import cloudIcon from 'src/theme/img/icon-nuvem.svg';
import personalizeIcon from 'src/theme/img/icon-personalize.svg';
import packIcon from 'src/theme/img/icon-pacote.svg';

export default function Index() {
    return (
        <Page
            title="Como Funciona"
        >
            <section className="s-como-funciona">
                <div className="container">
                    <div className="title">
                        <h2>Como Funciona</h2>
                    </div>

                    <div className="etapas">
                        <div className="item">
                            <div className="ilustra">
                                <div className="circle">
                                    <img src={favoriteIcon} className="icon-heart" alt="" />
                                </div>
                                <span>ou</span>
                                <div className="circle">
                                    <img src={cloudIcon} alt="" />
                                </div>
                            </div>
                            <h3>Escolha imagens ou envie suas próprias</h3>
                            <p>Navegue por nossas coleções, faça uma busca direta e escolha entre as melhores imagens disponíveis em nosso
                                site. Favorite as suas preferidas e crie o seu acervo pessoal na SUA GALERIA.</p>
                        </div>
                        <div className="item">
                            <div className="ilustra">
                                <div className="circle">
                                    <img src={personalizeIcon} alt="" />
                                </div>
                            </div>
                            <h3>Personalize o quadro como preferir</h3>
                            <p>
                                É possível personalizar o seu quadro escolhendo entre diversos tamanhos e diferentes molduras.
                            </p>
                            <p>
                                O quadro em Canvas pode ter borda preta, branca ou espelhada. O quadro emoldurado pode ser com ou sem borda.
                            </p>
                            <p>
                                Você pode ainda aplicar um efeito na imagem e deixar o quadro com o seu estilo.
                            </p>
                        </div>
                        <div className="item">
                            <div className="ilustra">
                                <div className="circle">
                                    <img src={packIcon} alt="" />
                                </div>
                            </div>
                            <h3>RECEBA COM SEGUNRAÇA E DECORE SUA CASA</h3>
                            <p>
                                Produziremos seu quadro com qualidade e atenção aos mínimos detalhes.
                            </p>
                            <p>
                                Embalaremos cuidadosamente e enviaremos a você pronto para pendurar!
                            </p>
                        </div>
                    </div>

                    <Link component={RouterLink} to="/comece-seu-quadro" className="btn-green">COMEÇAR MEU QUADRO</Link>
                </div>
            </section>
        </Page>
    )
}
