import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

function GoogleAnalytics() {

        const store = useSelector((state) => state.interface.store);

        let gaId = store.tools.googleAnalyticsId;

        if(!gaId) {
                return (<></>);
        }

        return (
                <Helmet>
                        <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        />
                        <script>
                                {`
                                        window.dataLayer = window.dataLayer || [];

                                        function gtag() {
                                                dataLayer.push(arguments);
                                        }

                                        gtag('js', new Date());
                                `}
                        </script>
                </Helmet>
        );
}

export default GoogleAnalytics;
