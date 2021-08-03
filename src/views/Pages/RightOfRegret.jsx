import React from 'react';
import Page from 'src/components/Page';

export default function Index() {

    return (
        <Page
            title="Direito de Arrependimento"
        >
            <section class="title-page-institucional">
                <div class="container">
                    <div class="title">
                        <h2>Direito de Arrependimento</h2>
                    </div>
                </div>
            </section>

            <section class="s-txt-confiavel">
                <div class="container">
                    <p>
                        Caso você receba o produto e queira desistir da compra (o que duvidamos muito), você tem o direito de devolvê-lo
                        e receber a restituição do valor de seu pedido. O prazo para desistência da compra, de acordo com o Art. 49 da
                        Lei nº 8.078, é de 07 (sete) dias corridos a contar do recebimento do produto. O custo com o frete será por
                        conta do comprador.

                    </p>
                    <p>
                        A restituição ocorrerá da seguinte forma:

                    </p>
                    <p>
                        Cartão de crédito - Será solicitado o cancelamento do débito à administradora do seu cartão. O estorno poderá
                        ocorrer em até 02 (duas) faturas subseqüentes. Este procedimento é de responsabilidade da administradora do
                        cartão.

                    </p>
                    <p>
                        Boleto bancário - A restituição será feita em sua conta corrente em até 10 (dez) dias úteis.

                    </p>
                </div>
            </section>

        </Page>
    )
}
