import React from 'react';
import Page from 'src/components/Page';

import imgGoogle from 'src/theme/img/google-site-seguro.png';
import imgGeoTrust from 'src/theme/img/geo-trust-text.png';
import imgClearsale from 'src/theme/img/clearsale-xs.png';

export default function Index() {

    return (
        <Page
            title="Loja Confiável"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Loja Confiável</h2>
                    </div>
                </div>
            </section>

            <section className="s-txt-confiavel">
                <div className="container">
                    <div className="txt-list">
                        <div className="left">
                            <h3>SIM, A ON THE WALL É CONFIÁVEL!</h3>
                            <ul>
                                <li>
                                    <img src={imgGoogle} alt="" />
                                </li>
                                <li>
                                    <img src={imgGeoTrust} alt="" />
                                </li>
                                <li>
                                    <img src={imgClearsale} alt="" />
                                </li>
                            </ul>
                        </div>
                        <div className="txt">
                            <p>
                                Com o intuito de levar inovação, através de uma proposta sofisticada e moderna, a On The Wall, nasceu em
                                2013, trazendo conveniência em decoração àqueles que apreciam a arte em quadros.
                            </p>
                            <p>
                                Com um extenso banco de imagens, todas devidamente licenciadas, é possível escolher entre as várias coleções
                                que vão de paisagens, ilustrações, frases divertidas e abstratas até galerias de artistas selecionados ou
                                artes criadas pela própria On The Wall.
                            </p>
                            <p>
                                O grande diferencial é o fato de poder criar o quadro ou pôster com o tamanho que quiser, a partir da imagem
                                escolhida. Além disto é também possível transformar fotos ou ilustrações próprias em quadros.
                            </p>
                        </div>
                    </div>
                    <div className="item-text">
                        <h3>MATERIAIS DE PRIMEIRA LINHA</h3>
                        <p>
                            Desde o início nos preocupamos com o produto final que iríamos entregar aos nossos clientes. Motivados por
                            isso fomos em busca de produtores e importadores de insumos com garantia de qualidade.
                        </p>
                        <p>
                            Para nossa linha de quadros com moldura, trabalhamos 100% com molduras fornecidas pela Moldurarte - uma das
                            maiores indústrias de moldura do Brasil. Com eles temos garantia de qualidade e durabilidade, tudo isso com
                            certificação ambiental de procedência das madeiras.
                        </p>
                        <p>
                            Nossos papéis são importados da Alemanha por outro parceiro comercial, assim como o tecido canvas para nosso
                            quadro em canvas. Nossos quadros são impressos na On The Wall.
                        </p>
                        <p>
                            Trabalhamos com tinta eco-solvente da marca Marabu, outra marca reconhecida no mercado pela fidelidade e
                            durabilidade dos pigmentos da tinta.
                        </p>
                    </div>
                    <div className="item-text">
                        <h3>AMBIENTE DE IMPRESSÃO</h3>
                        <p>Visando a qualidade dos nossos materiais impressos, temos um centro de impressão climatizado. Desta forma
                            conseguimos controlar a umidade e temperatura da sala para garantir a uniformidade das impressões.                    
                        </p>
                    </div>
                    <div className="item-text">
                        <h3>PRODUÇÃO</h3>
                        <p>Todo o processo de produção é feito artesanalmente na On The Wall por moldureiros profissionais. O corte e
                            acabamento perfeitos são supervisionados quadro a quadro. Nosso maquinário é fornecido e revisado por empresas
                            de renome no mercado de molduras.                 
                        </p>
                    </div>
                    <div className="item-text">
                        <h3>PLATAFORMA SOB MEDIDA</h3>
                        <p>
                            A loja On The Wall está sempre em busca do melhor. Além de disponibilizarmos os melhores produtos, utilizamos
                            também o que a tecnologia tem de melhor a oferecer. É por isso que utilizamos Magento, uma plataforma líder no
                            mercado mundial, altamente customizável que destaca pela sua robusta estrutura de dados.
                        </p>
                        <p>
                            Cada etapa da nossa operação foi estudada e projetada para trazer maior comodidade para você na hora da
                            compra. Nosso site é 100% responsivo, ou seja, você pode criar um quadro personalizado a partir de qualquer
                            dispositivo, seja celular, tablet ou computador.
                        </p>
                        <p>
                            Todo o site está equipado com o protocolo HTTPS para que possa navegar tranquilamente dentro de um ambiente
                            totalmente seguro e confiável.
                        </p>
                        <p>
                            A On The Wall utiliza os servidores Amazon, de altíssima velocidade, que proporcionam navegação fluida e sem
                            lentidão, garantindo uma experiência de completa satisfação.
                        </p>
                    </div>
                </div>
            </section>
        </Page>
    )
}
