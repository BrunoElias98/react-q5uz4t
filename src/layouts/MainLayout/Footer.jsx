import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme, Link, useMediaQuery } from '@material-ui/core';

import imgIconPhone from 'src/theme/img/icon-phone.svg';
import imgWhatsapp from 'src/theme/img/whatsapp.svg';
import imgGoogle from 'src/theme/img/google.png';
import imgClearsale from 'src/theme/img/clearsale.png';
import imgGeoTrust from 'src/theme/img/geotrust.png';
import imgVisa from 'src/theme/img/visa.png';
import imgMaster from 'src/theme/img/master.png';
import imgElo from 'src/theme/img/elo.png';
import imgAmerican from 'src/theme/img/american.png';
import imgDiners from 'src/theme/img/diners.png';
import imgHipercad from 'src/theme/img/hipercard.png';
import imgBillet from 'src/theme/img/boleto.png';
import imgMoldurarte from 'src/theme/img/moldurarte.png';
import imgProcon from 'src/theme/img/procon.png';
import imgLogoFooter from 'src/theme/img/logo-footer.svg';
import imgLogo from 'src/theme/img/logo-emutua-white.png';
import imgLogoVolts from 'src/theme/img/voltz.svg';

function Footer() {
    const store = useSelector((state) => state.interface.store);

    const theme = useTheme();
    const mobileSize = !(useMediaQuery(theme.breakpoints.up('sm')));

    let linkWhatsapp = false;
    if (store.contacts.whatsapp) {
        if (mobileSize) {
            linkWhatsapp = 'https://wa.me/55' + store.contacts.whatsapp.match(/\d+/g).join([]);
        }
        else {
            linkWhatsapp = 'https://web.whatsapp.com/send?phone=55' + store.contacts.whatsapp.match(/\d+/g).join([]);
        }
    }

    return (
        <>
            <footer>
                <div className="container">
                    <div className="item">
                        <ul className="list-contato">
                            <li>
                                <div className="phones">
                                    <a href="">
                                        <img src={imgIconPhone} alt="" />
                                        <span>(47) 3521-7830</span>
                                    </a>
                                    {linkWhatsapp && (
                                        <Link component={Link} href={linkWhatsapp} target="blank">
                                            <img src={imgWhatsapp} alt="" />
                                            <span>{store.contacts.whatsapp}</span>
                                        </Link>
                                    )}
                                </div>
                            </li>
                            <li>
                                <p>
                                    {store.address.street}, {store.address.number} - {store.address.complement} - {store.address.district}<br />
                                    CEP {store.address.zipcode} - {store.address.city}/{store.address.region}
                                </p>
                            </li>
                            <li>
                                <p>CNPJ: {store.document.value}</p>
                            </li>
                            <li>
                                <div className="social">
                                    <span>Acompanhe<br />também:</span>
                                    <ul>
                                        <li><Link component={Link} href={store.social.instagram} target="blank"><i className="fa fa-instagram"></i></Link></li>
                                        <li><Link component={Link} href={store.social.facebook} target="blank"><i className="fa fa-facebook-square"></i></Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="item">
                        <ul className="list-menu">
                            <li><Link component={RouterLink} to="/como-funciona">Como funciona?</Link></li>
                            <li><Link component={RouterLink} to="/tipos-de-quadros">Tipos de Quadros</Link></li>
                            <li><Link component={RouterLink} to="/precos-quadros">Preços dos Quadros</Link></li>
                            <li><Link component={RouterLink} to="/perguntas-frequentes">Dúvidas Gerais</Link></li>
                            <li><Link component={RouterLink} to="/fale-conosco">Fale Conosco</Link></li>
                            <li><Link href="https://www.onthewall.com.br/blog/" target="_blank">Blog On The Wall</Link></li>
                            <li><Link component={RouterLink} to="/loja-confiavel">Loja Confiável</Link></li>
                            <li><Link component={RouterLink} to="/quadros-personalizados">Quadro Personalizados</Link></li>
                            <li><Link component={RouterLink} to="/quadros-decorativos">Quadros Decorativos</Link></li>
                            <li><Link component={RouterLink} to="/comprar-quadros-online">Quadros Decorativos Online</Link></li>
                        </ul>
                    </div>
                    <div className="item">
                        <h3>Sistemas de Segurança</h3>
                        <ul className="list-seguranca">
                            <li><img src={imgGoogle} alt="" /></li>
                            <li><img src={imgClearsale} alt="" /></li>
                            <li><img src={imgGeoTrust} alt="" /></li>
                        </ul>
                        <h3>Pagamentos aceitos</h3>
                        <ul className="list-pagamentos">
                            <li><img src={imgVisa} alt="" /></li>
                            <li><img src={imgMaster} alt="" /></li>
                            <li><img src={imgElo} alt="" /></li>
                            <li><img src={imgAmerican} alt="" /></li>
                            <li><img src={imgDiners} alt="" /></li>
                            <li><img src={imgHipercad} alt="" /></li>
                            <li><img src={imgBillet} alt="" /></li>
                        </ul>
                    </div>
                    <div className="item">
                        <h3>Exclusividade</h3>
                        <ul className="list-exclusividade">
                            <li><img src={imgMoldurarte} alt="" /></li>
                            <li><a href="http://www.procon.sc.gov.br/index.php/atendimento" target="_blank"><img src={imgProcon} alt="" /></a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            <section className="copyright">
                <div className="container">
                    <img src={imgLogoFooter} alt="" />
                    <ul>
                        <li><Link component={RouterLink} to="/termos-uso">Termos de Uso</Link></li>
                        <li><Link component={RouterLink} to="/direito-arrependimento">Direito de Arrependimento</Link></li>
                        <li><Link component={RouterLink} to="/politica-de-privacidade">Política de Privacidade</Link></li>
                    </ul>
                    <div className="dev">
                        <span>Feito por</span>
                        <a href="https://emutuadigital.com/" target="_blank">
                            <img style={{ minWidth: '50px', height: '10px', marginRight: '10px' }} src={imgLogo} alt="" />
                        </a>
                        <span>e</span>
                        <a href="https://www.voltsdigital.com.br/" target="_blank">
                            <img style={{ width: '20px' }} src={imgLogoVolts} alt="" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

Footer.propTypes = {
};

export default Footer;
