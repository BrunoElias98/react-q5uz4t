import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Page from 'src/components/Page';

import imgPhotoCreate from 'src/theme/img/foto-cria-quadro.jpg';
import imgFrameCanvas from 'src/theme/img/quadro-canvas-sm.jpg';
import imgFrameSm from 'src/theme/img/img-moldura-sm.jpg';
import imgPosterSm from 'src/theme/img/img-poster-sm.jpg';
import imgCorkStopper from 'src/theme/img/img-porta-rolhas-sm.jpg';
import imgCaps from 'src/theme/img/img-tampinhas-sm.jpg';
import imgFrameTravel from 'src/theme/img/img-quadro-viagens.jpg';
import imgFrameMemories from 'src/theme/img/img-quadro-lembrancas-sm.jpg';

export default function Index() {

    return (
        <Page
            title="Quadros Decorativos"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Quadros Decorativos</h2>
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
                                <h4>Você define cada detalhe do seu quadro</h4>
                                <p>
                                    Você encontra aqui na On The Wall um mundo de possibilidades para confeccionar seus quadros decorativos.
                                    De uma maneira muito fácil você escolhe o tipo do quadro entre canvas ou moldura, o tamanho, a borda e
                                    muito mais. Você pode criar o quadro com uma foto sua ou utilizar nosso banco de imagens. É rápido e
                                    prático!
                                </p>
                                <Link component={RouterLink} to="/comece-seu-quadro">COMEÇAR MEU QUADRO</Link>
                            </div>
                        </div>
                    </div>
                    <div className="box-descricao-produtos">
                        <div className="title">
                            <h3>Tipo do quadro: Canvas ou Moldura?</h3>
                        </div>
                        <div className="sub-box">
                            <p>Após selecionar sua imagem, você começará a criar seu quadro decorativo e poderá escolher entre dois
                            modelos: <strong>Canvas ou Moldura</strong>. </p>
                        </div>
                        <div className="body-box">
                            <div className="item">
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgFrameCanvas} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Canvas</h4>
                                        <p>
                                            O quadro decorativo em canvas se assemelha às telas utilizadas para pintura óleo. É fabricado com um
                                            tecido especial composto de algodão e poliéster que é esticado sobre um chassi de madeira. Após a
                                            impressão é aplicado verniz sobre a tela para maior proteção de durabilidade do quadro.
                                        </p>
                                        <Link component={RouterLink} to="/canvas">QUADROS EM CANVAS</Link>
                                    </div>
                                </div>
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgFrameSm} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Moldura</h4>
                                        <p>
                                            O quadro decorativo com moldura é impresso em papel fotográfico e você pode selecionar a moldura que
                                            deseja entre diversas opções que o site disponibiliza. Para a proteção da imagem impressa o quadro
                                            possui um acrílico cristal de 2mm.
                                        </p>
                                        <a href="">QUADROS EM MOLDURA</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-descricao-produtos">
                        <div className="title">
                            <h3>Outros produtos On The Wall</h3>
                        </div>
                        <div className="body-box">
                            <div className="item">
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgPosterSm} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Pôster</h4>
                                        <p>
                                            Você tem a opção de criar também o seu próprio pôster, a partir do nosso banco de imagens ou com uma
                                            foto enviada por você.
                                        </p>
                                    </div>
                                </div>
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgCorkStopper} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Quadro Porta Rolhas</h4>
                                        <p>
                                            Possuímos diversos modelos de quadros porta rolhas. Ele é feito para decorar seu ambiente e armazenar
                                            as rolhas de seu vinho ou espumantes prediletos e degustados em momentos felizes.
                                        </p>
                                        <a href="quadros-prontos.html">VER ESTE PRODUTO</a>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgCaps} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Quadro Tampinhas</h4>
                                        <p>
                                            O quadro tampinha é ideal para os amantes de cerveja. Com ele você poderá guardar as tampinhas de suas
                                            cervejas preferidas, colecionar tampinhas das cervejas experimentadas e ao mesmo tempo dar um toque
                                            especial em seu cômodo.
                                        </p>
                                        <a href="">VER ESTE PRODUTO</a>
                                    </div>
                                </div>
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgFrameTravel} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Quadro Minhas Viagens</h4>
                                        <p>
                                            Adora viajar? Então este quadro foi feito para você. O quadro Minhas Viagens é feito para você marcar
                                            suas viagens realizadas ou aquelas que ainda estão sendo planejadas utilizando alfinetes no mapa.
                                            Temos as opções de mapa-múndi e mapa do Brasil e várias cores para combinar com a sua decoração.
                                        </p>
                                        <a href="produto-mapa.html">VER ESTE PRODUTO</a>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="txt-image">
                                    <div className="image">
                                        <img src={imgFrameMemories} alt="" />
                                    </div>
                                    <div className="txt">
                                        <h4>Quadro Minhas Lembranças</h4>
                                        <p>
                                            Adora viajar? Então este quadro foi feito para você. O quadro Minhas Viagens é feito para você marcar
                                            suas viagens realizadas ou aquelas que ainda estão sendo planejadas utilizando alfinetes no mapa.
                                            Temos as opções de mapa-múndi e mapa do Brasil e várias cores para combinar com a sua decoração.
                                        </p>
                                        <a href="">VER ESTE PRODUTO</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
