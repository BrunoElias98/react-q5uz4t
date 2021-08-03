import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import 'src/theme/index.css';
import 'src/theme/plugins.css';
import 'swiper/css/swiper.css';

import 'src/theme/scss/main.scss';

// import 'src/js/plugins';
// import 'src/js/all.min.js';

import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'src/serviceWorker';
import { SettingsProvider } from 'src/context/SettingsContext';
import { configureStore } from 'src/store';
import { restoreSettings } from 'src/utils/settings';
import { I18nextProvider } from "react-i18next";
import i18n from "src/utils/i18n";
import App from 'src/App';

serviceWorker.unregister();
enableES5();

const store = configureStore();
const settings = restoreSettings();

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <SettingsProvider settings={settings}>
                <App />
            </SettingsProvider>
        </I18nextProvider>
    </Provider>,
    document.getElementById('root')
);

