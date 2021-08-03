import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'src/components/Page';
import { Link } from '@material-ui/core';
import { handleOpenMenu, addFavorite } from 'src/actions';
import imgIconCatalog from 'src/theme/img/icon-catalogo-img.svg';
import imgHeartFull from 'src/theme/img/icon-heart-full.svg';
import imgIconNuvem from 'src/theme/img/icon-nuvem.svg';

export default function Index() {
    const dispatch = useDispatch();
    const inputFile = useRef(null);
    const categories = useSelector((state) => state.interface.globalData.categoriesMenu);

    const handleOpen = () => {
        let category = categories.filter(category => category.slug === 'catalogo-de-imagens')[0];
        
        dispatch(handleOpenMenu(category.id));
    };

    const handleOpenPopup = () => {
        inputFile.current.click();
    };

    const handleChange = (e) => {
        const { files } = e.target;
        let reader = new FileReader();

        reader.onload = function (e) {
            dispatch(addFavorite(null, { url: e.target.result }));
        }

        reader.readAsDataURL(files[0]);
    };

    return (
        <Page
            title="Comece seu quadro"
        >
            <section className="s-title-page">
                <div className="container">
                    <div className="txt-result">
                        <h3>Comece seu Quadro</h3>
                    </div>
                </div>
            </section>

            <section className="s-comece-quadro">
                <div className="container">
                    <p className="txt-info">Escolha uma das opções abaixo para personalizar uma imagem e transformá-la num lindo quadro:
                    </p>
                    <ul>
                        <li>
                            <Link onClick={handleOpen} component={RouterLink} className="box js-show-catalogo-img">
                                <img src={imgIconCatalog} alt="" />
                                <h3>Clique e confira nosso catálogo de imagens</h3>
                            </Link>
                        </li>
                        <li>
                            <Link component={RouterLink} to="/wishlist" className="box">
                                <img src={imgHeartFull} alt="" />
                                <h3>Clique para abrir suas imagens favoritas</h3>
                            </Link>
                        </li>
                        <li>
                            <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{ display: 'none' }} />
                            <button onClick={handleOpenPopup} style={{ cursor: 'pointer' }} className="box">
                                <img src={imgIconNuvem} alt="" />
                                <h3>Clique aqui para<br /> enviar sua imagem</h3>
                            </button>
                        </li>
                    </ul>
                    <div className="circles">
                        <div className="circle">
                            <h4>ESCOLHA UMA IMAGEM DO NOSSO CATÁLOGO</h4>
                            <p>Navegue pelo nosso catálogo de imagens e comece seu quadro utilizando a imagem escolhida. Se preferir, adicione várias imagens aos seus favoritos. </p>
                        </div>
                        <div className="circle">
                            <h4>ESCOLHA UMA IMAGEM ENTRE SUAS FAVORITAS</h4>
                            <p>Ao navegar pelas nossas categorias de imagens ou fotógrafos, você pode favoritar imagens para criar seu quadro depois.</p>
                        </div>
                        <div className="circle">
                            <h4>ESCOLHA UMA IMAGEM DO SEU COMPUTADOR</h4>
                            <p>Envie suas imagens próprias, salvas em seu computador para que possa configurar como preferir e criar seu quadro personalizado.</p>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
