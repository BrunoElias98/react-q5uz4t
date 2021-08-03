import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Page from 'src/components/Page';

import imgBuyMap from 'src/theme/img/img-compra-mapa.jpg';
import imgFrameCanvas from 'src/theme/img/quadro-canvas-online.jpg';
import imgFrameSm from 'src/theme/img/comprar-molduras-online.jpg';
import imgKitFrames from 'src/theme/img/comprar-kit-quadros-online.jpg';
import imgCorkStopper from 'src/theme/img/comprar-porta-rolhas-online.jpg';
import imgCaps from 'src/theme/img/comprar-porta-tampinhas.jpg';

export default function Index() {

    return (
        <Page
            title="Comprar Quadros Online"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Comprar Quadros Online</h2>
                    </div>
                </div>
            </section>

            <section className="s-txt-confiavel">
                <div className="container">
                    <div className="item-text">
                        <p>
                            Não importa se você está fazendo a decoração da sua sala, cozinha ou escritório, os quadros decorativos podem
                            te ajudar a eliminar a monotonia e dar exclusividade ao seu ambiente.
                        </p>
                        <p>
                            E, com a praticidade e a comodidade da internet, a primeira e grande vantagem de comprar quadros online é a
                            possibilidade de encontrar diferentes estilos de quadros decorativos, assim você encontra aquele quadro que
                            vai ser a peça chave na sua decoração.
                        </p>
                        <p>
                            Os quadros são essenciais para dar personalidade a qualquer ambiente e, por meio da internet, você pode
                            comprar quadros online personalizados, podendo escolher qualquer tipo de imagem que você quiser, desde
                            paisagens, frases motivacionais ou mesmo uma foto que seja especial.
                        </p>
                        <p>
                            Mas não apenas isso, comprar quadros online possibilita que você tenha todo o tempo que quiser para escolher o
                            quadro ideal e ainda evita ter que gastar dinheiro para se locomover até uma loja que tenha a arte que você
                            deseja. Você faz tudo no conforto da sua casa, sem pressa e sem vendedor no seu pé.
                        </p>
                        <p>
                            Você ainda tem a vantagem de poder escolher um estilo, tal como rústico, moderno, minimalista, entre outros, e
                            conseguir encontrar os quadros que vão te ajudar a compor o visual que precisa.
                        </p>
                        <p>
                            Hoje em dia você encontra praticamente de tudo na internet e quadros que combinem com a sua decoração é o que
                            não vão faltar.
                        </p>
                    </div>
                    <div className="item-text">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgBuyMap} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Comprar mapa para pinar viagens online</h4>
                                <p>
                                    Viajar é uma das melhores coisas que você pode fazer na sua vida, de acordo com pesquisas o valor que uma
                                    viagem gera para uma pessoa é muito maior do que o valor gerado pela compra de bens materiais.
                                </p>
                                <p>
                                    E para quem gosta de viajar e também de guardar lembranças das viagens que fez, os <Link component={RouterLink} to="/"> quadros de
                                    mapa para
                                        pinar viagens</Link> serão seus aliados. Com eles você pode marcar os locais em que já esteve utilizando um
                                    alfinete. É uma maneira divertida e personalizada de lembrar das viagens inesquecíveis que você já fez nos
                                    diversos cantos do mundo.
                                </p>
                                <p>
                                    Aqui na On The Wall nós trabalhamos com tamanhos variados de mapa-múndi e mapa do Brasil, além de texturas
                                    variadas e duas cores de moldura, assim você pode comprar mapa para pinar viagens online de acordo com o
                                    tamanho do seu espaço, o estilo da sua decoração e as viagens que você faz.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgFrameCanvas} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Comprar quadros em canvas online</h4>
                                <p>
                                    Os <Link component={RouterLink} to="/"> quadros em canvas</Link> são amplamente utilizados nos dias atuais, permitindo que sua
                                    decoração tenha um
                                    visual mais moderno.
                                </p>
                                <p>
                                    Esse tipo de tecido é semelhante ao que é utilizado nas telas para pintura a óleo e proporciona um visual
                                    muito bem detalhado, tanto por sua textura quanto pelos efeitos que podem ser produzidos, já que as
                                    imagens impressas são de alta resolução.
                                </p>
                                <p>
                                    Comprar quadros em canvas online na On The Wall é a opção ideal. Isso porque nossos produtos possuem alta
                                    durabilidade e um visual que fará toda a diferença para conferir mais vida na sua parede. E nós já
                                    enviamos os quadros para sua casa prontos para serem pendurados na parede.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgFrameSm} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Comprar quadros com moldura online</h4>
                                <p>
                                    Se você estiver pensando em comprar <Link component={RouterLink} to="/"> quadros com moldura online</Link>, saiba que esses exigem um
                                    pouco mais de cuidado do que seria um quadro decorativo em canvas, por exemplo.
                                </p>
                                <p>
                                    Os quadros com moldura são um pouco mais difíceis de se escolher o ideal, já que, a depender do tipo de
                                    moldura selecionada, você pode tanto valorizar a arte quanto acabar desvalorizando e, ainda, comprometendo
                                    a sua decoração. Tudo vai depender também do estilo de decoração que você queira e então conseguirá
                                    comprar quadros com moldura online que representem a sua personalidade e melhorem o visual do seu
                                    ambiente.
                                </p>
                                <p>
                                    Na On The Wall você pode ficar tranquilo quanto isso, pois contamos com diversos modelos de molduras e
                                    você consegue ir visualizando uma simulação do seu quadro com as suas escolhas. Assim, você dá um toque
                                    especial nos seus quadros decorativos.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgKitFrames} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Comprar kit de quadros online</h4>
                                <p>
                                    O <Link component={RouterLink} to="/"> kit de quadros online</Link> é uma ótima opção para garantir harmonia na sua decoração, pois,
                                    fazendo a
                                    composição correta com o restante da decoração, você consegue dar mais vida e destaque para o seu
                                    ambiente.

                                </p>
                                <p>
                                    E não importa o tipo de espaço (residencial ou comercial), com o conjunto de quadros decorativos você
                                    consegue enriquecer a decoração do seu espaço gastando pouco tempo, por isso hoje em dia ele vem sendo
                                    cada
                                    vez mais utilizado.
                                </p>

                                <p>
                                    O ideal é em que em espaços pequenos se utilizem poucos quadros decorativos ou mesmo opte pelos menores,
                                    assim você evita que sua parede fique poluída. Agora, se você tiver um espaço maior, pode apostar em dois
                                    ou
                                    mais quadros grandes, tudo vai depender do estilo da sua decoração e do seu gosto.
                                </p>

                                <p>
                                    Para quem pretende comprar quadros online, os conjuntos de quadros decorativos têm como principal
                                    benefício
                                    a sua composição já definida, assim, você não perde tempo tentando harmonizar um quadro com outro. Porém,
                                    é
                                    essencial que esse kit combine bem com o restante da decoração do seu espaço para não criar aquele visual
                                    de
                                    que parece que tem algo sobrando.
                                </p>
                                <p>
                                    Aqui na On The Wall você encontra uma variedade de kits de quadros decorativos, desde quadros com
                                    paisagens,
                                    frases divertidas ou motivacionais, com três, quatro ou cinco telas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgCorkStopper} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Comprar quadros porta rolhas online</h4>
                                <p>
                                    Para os apreciadores de um bom vinho, comprar quadros <Link component={RouterLink} to="/"> porta rolha online</Link> é uma opção bem
                                    interessante para personalizar seu espaço mostrando essa sua paixão, tendo um objeto decorativo e também
                                    funcional.
                                </p>
                                <p>
                                    O quadro possui um orifício na parte superior para as rolhas serem depositadas. Utilizamos moldura com
                                    certificação ambiental FSC, cobertura em acrílico cristal de 2mm, fundo impresso em papel fotográfico e
                                    adesivado sobre HDF. O quadro vai pronto para pendurar.
                                </p>
                                <p>
                                    Na On The Wall existem 3 tamanhos de quadros porta rolha, e há a opção com ou sem impressão no acrílico.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <div className="txt-image">
                            <div className="image">
                                <img src={imgCaps} alt="" />
                            </div>
                            <div className="txt">
                                <h4>Comprar quadros porta tampinha online</h4>
                                <p>
                                    Do mesmo modo que os <Link component={RouterLink} to="/"> quadros porta rolhas</Link>, os <Link component={RouterLink} to="/"> quadros porta tampinha</Link> são
                                    essenciais para decorar e
                                    oferecer utilidade. Para você que é amante de cervejas e quer expor aos visitantes a coleção de tampinhas
                                    das suas geladas, esse quadro decorativo será o seu coringa.
                                </p>
                                <p>
                                    E para quem está buscando um presente para aquele amigo aficionado por cervejas e por colecionar
                                    tampinhas, essa aqui é uma opção bem interessante.

                                </p>
                                <p>
                                    São dois modelos de quadro porta tampinha disponíveis: um deles possui o orifício na parte superior da
                                    moldura para inserir as tampinhas, que caem de forma aleatória. Já no outro modelo, o orifício está na
                                    parte superior do acrílico, dessa forma as tampinhas ficarão organizadas e com a marca aparecendo, ou
                                    seja, cabem menos tampinhas, mas você consegue visualizar todas elas. E ainda tem a opção de impressão no
                                    acrílico.

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <h3>Comprar quadros online é seguro?</h3>
                        <p>
                            Como em qualquer compra pela internet, é importante pesquisar um pouco para garantir que é uma loja confiável.
                            Você pode buscar informações buscando pelo nome da loja no Google, por exemplo. Avaliações no Facebook também
                            podem ajudar bastante para garantir que é um site confiável. Verifique se no site da loja estão disponíveis as
                            informações sobre a loja, como CNPJ, endereço e telefone para contato. É muito importante ter um canal direto
                            de comunicação com a loja caso seja necessário resolver alguma situação ou tirar dúvidas antes da compra.

                        </p>
                        <p>
                            Uma loja confiável, além de utilizar materiais de qualidade, também remunera o trabalho do fotógrafo ou
                            artista que desenvolveu a arte.Nosso site conta com certificado SSL, um tipo de tecnologia baseada em
                            criptografia que confere em maior segurança na troca de informações pessoais ou de pagamento, desse modo seus
                            dados ficam protegidos e você mais tranquilo ao realizar a sua compra online.

                        </p>
                        <p>
                            Leia aqui porque <Link component={RouterLink} to="/"> comprar na On The Wall é seguro</Link>.

                        </p>
                    </div>
                    <div className="item-text">
                        <h3>Onde comprar quadros online?</h3>
                        <p>
                            Aqui na On The Wall nós contamos com uma variedade de quadros decorativos e sempre estamos adicionando novas
                            opções de imagens e produtos para que você encontre aquele quadro que vai fazer toda a diferença na sua
                            decoração.

                        </p>
                        <p>
                            A nossa reputação foi construída com base no relacionamento direto e transparente que temos com nossos
                            clientes. Temos profissionais capacitados para ajudar no momento da compra e auxiliar da melhor forma.

                        </p>
                    </div>
                </div>
            </section>
        </Page>
    )
}
