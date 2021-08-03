import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Accordion, AccordionSummary, AccordionDetails, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import imgIconInformation from 'src/theme/img/icon-information.svg';
import imgDownOrange from 'src/theme/img/arrow-down-orange.svg';

const useStyles = makeStyles(() => ({
    paragraph: {
        '& p': {
            color: '#656d78',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: '18px',
            marginBottom: '15px'
        }
    }
}));

export default function Index() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Page
            title="Perguntas Frequentes"
        >
            <section className="title-page-institucional">
                <div className="container">
                    <div className="title">
                        <h2>Perguntas Frequentes</h2>
                    </div>
                </div>
            </section>

            <section className="s-perguntas">
                <div className="container">
                    <div className="perguntas">
                        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Como fazer um pedido?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>
                                        Na On The Wall é você que monta seu quadro. Escolha a imagem, o produto, tamanho e acabamentos.
                                        Para finalizar a compra você precisará fazer seu cadastro no site.
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Quanto custa?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                        suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Quando chega meu pedido?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Posso acompanhar o envio do meu pedido?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Qual é a embalagem utilizada para envio?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Quanto custa o envio?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Vocês fazem envios internacionais?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Quais são as opções de pagamento?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Qual é a política de devolução?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Posso cancelar o meu pedido?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion square expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                            <AccordionSummary style={{ backgroundImage: 'linear-gradient(203deg, #f9f9f9 0%, #f5f5f5 100%)' }} expandIcon={<img src={imgDownOrange} alt="" />}>
                                <div className="title">
                                    <h3 style={{ color: '#fe7733' }}>Minha peça chegou danificada. O que eu faço?</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="body-pergunta" className={classes.paragraph}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis, ut deserunt in officia
                                    suscipit, vero corporis incidunt perferendis sit eius ab non quam culpa corrupti adipisci ex neque facere.
                                    </p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt quidem quo dignissimos quibusdam
                                        tempora consequatur eos amet eius assumenda debitis magni recusandae facilis animi nam possimus, sunt
                                        voluptas. Repellat!
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="box-duvidas">
                        <div className="title">
                            <h3>SE AINDA TIVER DÚVIDAS</h3>
                        </div>
                        <div className="cont">
                            <div className="left">
                                <img src={imgIconInformation} alt="" />
                                <h4>Se precisar, temos várias formas para lhe ajudar.</h4>
                            </div>
                            <ul>
                                <li>
                                    <div className="info">
                                        <p><strong>Fone:</strong> (47) 3521-7830</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="info">
                                        <p><strong>sac@onthewall.com.br</strong></p>
                                    </div>
                                </li>
                                <li>
                                    <div className="info">
                                        <a href="#">Chat Online</a>
                                        <span>De Segunda a sexta-feira das 9:00 às 19:00h</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="info">
                                        <Link component={RouterLink} to="/fale-conosco">Fale Conosco</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}
