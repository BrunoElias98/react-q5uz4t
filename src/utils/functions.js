export function formatPrice(price) {
    var translateStorage = localStorage.getItem('i18nextLng');

    //@TODO: Implemantar apenas quando houver controle de moedas no sistema
    // var locale = (translateStorage == 'en' ? 'en' : 'pt-br');
    // var currencyCode = (translateStorage == 'en' ? 'USD' : 'BRL');

    var locale = 'pt-br';
    var currencyCode = 'BRL';

    return Number(price).toLocaleString(locale, { style: 'currency', currency: currencyCode });
}

export function formatPriceBlock(price) {
    var translateStorage = localStorage.getItem('i18nextLng');

    //@TODO: Implemantar apenas quando houver controle de moedas no sistema
    // var locale = (translateStorage == 'en' ? 'en' : 'pt-br');
    // var currencyCode = (translateStorage == 'en' ? 'USD' : 'BRL');

    var locale = 'de-DE';

    return Number(price).toLocaleString(locale, { minimumFractionDigits: 2 });
}

export const validateUser = (user) => {
    if (user.document === null || user.document === "" || user.phone === "" || user.phone === null) {
        return true;
    }
};