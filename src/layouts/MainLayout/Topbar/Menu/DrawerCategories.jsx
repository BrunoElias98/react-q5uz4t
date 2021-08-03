import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
    Button,
    Drawer,
    Divider,
    IconButton,
    Typography,
    Box,
    Grid,
    Paper,
    MenuList,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container
} from '@material-ui/core';
import {
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
} from 'react-feather';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const drawerWidth = 460;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        maxWidth: "100%"
    },
    button: {
        justifyContent: 'left',
    },
    drawerContainer: {
    },
    drawerHeader: {
        padding: theme.spacing(1)
    },
    drawerContent: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    link: {

    },
    nestedLink: {
        paddingLeft: theme.spacing(5)
    }
}));

export default function DrawerCategories({ handleDrawerClose, openDrawer, order }) {
    const store = useSelector((state) => state.interface.store);
    const classes = useStyles();
    const [translate, i18n] = useTranslation();
    const categories = useSelector((state) => state.interface.globalData.categoriesMenu);
    const attributes = useSelector((state) => state.interface.globalData.attributesMenu);

    const [menu, setMenu] = useState(null);

    const [open, setOpen] = useState(null);

    const [openList, setOpenList] = useState(null);


    const handleClick = (categoryId) => {
        if (openList === categoryId) {
            categoryId = null;
        }
        setOpenList(categoryId);
    };

    const generateMenu = () => {
        let items = [];

        for (let key in menu) {

            let item = null;
            let menuItem = menu[key];

            let hasChildren = (menuItem.children.length > 0);
            
            item = (
                <>
                    {menuItem.category.slug === 'catalogo-de-imagens' && (
                        <div className="all-categories">
                            <div className="item">
                                <ul>
                                    {menuItem.children.map(item => {
                                        return <li><a href="categoria.html">{item.category.name}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            );

            items.push(item);

        }

        return items;
    }

    useEffect(() => {
        let menu = [];
        let list = categories;

        list.map((category, i) => {
            let parentId = null;
            if (!category.parent) {
                menu[category.id] = {
                    category: category,
                    children: []
                };
            }
        });
        list.map((category, i) => {
            let parentId = null;
            if (category.parent) {
                parentId = category.parent.id;
                if (menu[parentId]) {
                    menu[parentId]['children'].push({
                        category: category,
                        children: []
                    });
                }
            }
        });
        setMenu(menu);
    }, [categories]);

    return (
        <>
            <div class="menu-mobile main-menu hidde-menu">
                <div class="header-menu">
                    <div class="left">
                        <span>categorias</span>
                    </div>
                    <button class="close-menu js-close-menu">
                        <img src="theme/img/icon-close-menu.svg" alt="" />
                    </button>
                </div>
                <div class="body-menu">
                    <ul class="list-categoria">
                        <li><a href="" >Enviar minhas Imagens</a></li>
                        <li><a href="" class="js-nav-categoria">Catálogo de Imagens <img src="theme/img/arrow-next-nivel.svg" alt="" /></a>
                        </li>
                        <li><a href="" class="js-nav-categoria">Galeria de Artistas <img src="theme/img/arrow-next-nivel.svg" alt="" /></a>
                        </li>
                        <li><a href="" class="js-nav-categoria">Tipos de Produtos <img src="theme/img/arrow-next-nivel.svg" alt="" /></a></li>
                        <li><a href="" class="js-nav-categoria">Quadros Prontos <img src="theme/img/arrow-next-nivel.svg" alt="" /></a></li>
                        <li><a href="" >Kit de Quadros</a></li>
                    </ul>
                    <div class="box-user">
                        <a href="" class="js-aside-user">
                            <img src="theme/img/icon-user-blue.svg" alt="" />
                            <p>ENTRAR <span>ou</span> <br />CADASTRE-SE</p>
                        </a>
                        <a href="" class="js-open-menu-user">
                            <div class="icon"></div>
                            <p>PRECISANDO<br />DE AJUDA?</p>
                        </a>
                    </div>
                    <ul class="list-menu-user">
                        <li><a href="como-funciona.html">Como funciona?</a></li>
                        <li><a href="tipos-quadros.html">Tipos de Quadros</a></li>
                        <li><a href="precos-quadros.html">Preços dos Quadros</a></li>
                        <li><a href="perguntas-frequentes.html">Dúvidas Gerais</a></li>
                        <li><a href="fale-conosco.html">Fale Conosco</a></li>
                        <li><a href="" >Blog On The Wall</a></li>
                        <li><a href="loja-confiavel.html">Loja Confiável</a></li>
                        <li><a href="quadros-personalizados.html">Quadro Personalizados</a></li>
                        <li><a href="quadros-decorativos.html">Quadros Decorativos</a></li>
                        <li><a href="comprar-quadros-online.html">Quadros Decorativos Online</a></li>
                    </ul>
                    <div class="footer-menu">
                        <div class="item">
                            <ul class="list-contato">
                                <li>
                                    <div class="phones">
                                        <a href="" >
                                            <img src="theme/img/icon-phone.svg" alt="" />
                                            <span>(47) 3521-7830</span>
                                        </a>
                                        <a href="" >
                                            <img src="theme/img/whatsapp.svg" alt="" />
                                            <span>(47) 98435-9387</span>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <p>
                                        Estrada Blumenau, 2222 - Setor 02 - Br /emer<br />CEP 89161-000 - Rio do Sul / SC
                            </p>
                                </li>
                                <li>
                                    <p>CNPJ: 17.796.714/0001-50</p>
                                </li>
                                <li>
                                    <div class="social">
                                        <span>Acompanhe<br />também:</span>
                                        <ul>
                                            <li><a href="" ><i class="fa fa-instagram"></i></a></li>
                                            <li><a href="" ><i class="fa fa-facebook-square"></i></a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="item">
                            <ul class="list-menu">
                                <li><a href="como-funciona.html">Como funciona?</a></li>
                                <li><a href="tipos-quadros.html">Tipos de Quadros</a></li>
                                <li><a href="precos-quadros.html">Preços dos Quadros</a></li>
                                <li><a href="perguntas-frequentes.html">Dúvidas Gerais</a></li>
                                <li><a href="fale-conosco.html">Fale Conosco</a></li>
                                <li><a href="" >Blog On The Wall</a></li>
                                <li><a href="loja-confiavel.html">Loja Confiável</a></li>
                                <li><a href="quadros-personalizados.html">Quadro Personalizados</a></li>
                                <li><a href="quadros-decorativos.html">Quadros Decorativos</a></li>
                                <li><a href="comprar-quadros-online.html">Quadros Decorativos Online</a></li>
                            </ul>
                        </div>
                        <div class="item">
                            <h3>Sistemas de Segurança</h3>
                            <ul class="list-seguranca">
                                <li><img src="theme/img/google.png" alt="" /></li>
                                <li><img src="theme/img/clearsale.png" alt="" /></li>
                                <li><img src="theme/img/geotrust.png" alt="" /></li>
                            </ul>
                            <h3>Pagamentos aceitos</h3>
                            <ul class="list-pagamentos">
                                <li><img src="theme/img/visa.png" alt="" /></li>
                                <li><img src="theme/img/master.png" alt="" /></li>
                                <li><img src="theme/img/american.png" alt="" /></li>
                                <li><img src="theme/img/elo.png" alt="" /></li>
                                <li><img src="theme/img/diners.png" alt="" /></li>
                                <li><img src="theme/img/hipercard.png" alt="" /></li>
                                <li><img src="theme/img/boleto.png" alt="" /></li>
                            </ul>
                        </div>
                        <div class="item">
                            <h3>Exclusividade</h3>
                            <ul class="list-exclusividade">
                                <li><img src="theme/img/moldurarte.png" alt="" /></li>
                                <li><img src="theme/img/procon.png" alt="" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
