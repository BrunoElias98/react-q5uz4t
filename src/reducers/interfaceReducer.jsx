import * as actionTypes from 'src/actions';

const initialState = {
    store: {},

    // store: {
    //     name: "Ma Beauty",
    //     logo: "/static/logo-mabeauty.png",
    //     favicon: "/static/favicon-mabeauty.png",
    //     legalName: "Ma Beauty Perfumaria e Cosméticos Ltda.",
    //     productPlaceholder: "/static/placeholder-mabeauty.jpg",
    //     maintenance: false,
    //     document: {
    //         type: 'cnpj',
    //         value: '21.657.480/0001-38'
    //     },
    //     address: {
    //         street: 'Avenida Francisco Prestes Maia',
    //         district: 'Centro',
    //         number: '143',
    //         complement: '',
    //         zicpode: '09770-000',
    //         city: 'São Bernardo do Campo',
    //         region: 'SP',
    //     },
    //     contacts: {
    //         email: 'contato@mabeautynaweb.com.br',
    //         phone: '(011) 4317-4129',
    //         whatsapp: '(011) 97186-2814'
    //     },
    //     social: {
    //         facebook: 'https://www.facebook.com/mabeautynaweb',
    //         instagram: 'https://www.instagram.com/mabeautynaweb/',
    //         youtube: null,
    //     }
    // },

    // store: {
    //     name: "Vinícola Vivalti",
    //     logo: "/static/vivalti/logo-vivalti.png",
    //     favicon: "/static/vivalti/favicon-vivalti.png",
    //     legalName: "Vivalti Vinícola LTDA",
    //     productPlaceholder: "/static/vivalti/placeholder-vivalti.jpg",
    //     maintenance: false,
    //     document: {
    //         type: 'cnpj',
    //         value: '23.113.493/0001-71'
    //     },
    //     address: {
    //         street: 'Rodovia SC 114 – KM 295',
    //         district: 'Monte Alegre',
    //         number: '',
    //         complement: '',
    //         zicpode: '88600-000',
    //         city: 'São Joaquim',
    //         region: 'SC',
    //     },
    //     contacts: {
    //         email: 'vivalti@vinicolavivalti.com.br',
    //         phone: '(047) 3372 6010',
    //         whatsapp: null
    //     },
    //     social: {
    //         facebook: 'https://www.facebook.com/Vin%C3%ADcola-Vivalti-462382107924585',
    //         instagram: 'https://www.instagram.com/vinicolavivalti/',
    //         youtube: null,
    //     },
    //     interface: {
    //         hasTopMenu: true,
    //         hasCategoriesMenu: false,
    //         hasSearchBar: false,
    //         logoEmutua: 'white'
    //     }
    // },

    globalMessage: {
        open: false,
        message: '',
        severity: ''
    },
    globalLoading: {
        open: false,
        queue: []
    },
    globalData: {
        attributesMenu: '',
        categoriesMenu: '',
        companyData: '',
        customerData: '',
        cartData: ''
    },
    menuCategory: {
        open: null
    },
    menuCustomerData: {
        open: false
    },
    favorites: {
        ids: []
    }
}

const interfaceReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case actionTypes.ADD_MESSAGE: {
            newState = {
                ...state,
                globalMessage: {
                    open: true,
                    message: action.message,
                    severity: action.severity
                }
            };
            break;
        }

        case actionTypes.REMOVE_MESSAGE: {
            newState = {
                ...state,
                globalMessage: initialState.globalMessage
            };
            break;
        }

        case actionTypes.ADD_LOADING_GLOBAL: {
            let newQueue = newState.globalLoading.queue;
            newQueue.push(action.id);
            newState = {
                ...state,
                globalLoading: {
                    open: (newQueue.length ? true : false),
                    queue: newQueue
                }
            };
            break;
        }

        case actionTypes.REMOVE_LOADING_GLOBAL: {
            let newQueue = newState.globalLoading.queue;
            for (let i = 0; i < newQueue.length; i++) {
                if (newQueue[i] === action.id) {
                    newQueue.splice(i, 1);
                }
            }
            newState = {
                ...state,
                globalLoading: {
                    open: (newQueue.length ? true : false),
                    queue: newQueue
                }
            };
            break;
        }

        case actionTypes.ADD_CATEGORIES_MENU: {
            newState = {
                ...state,
                globalData: {
                    ...state.globalData,
                    categoriesMenu: action.payload,
                }
            };

            break;
        }

        case actionTypes.ADD_ATTRIBUTES_MENU: {
            newState = {
                ...state,
                globalData: {
                    ...state.globalData,
                    attributesMenu: action.payload,
                }
            };

            break;
        }

        case actionTypes.SET_OPEN_MENU: {
            newState = {
                ...state,
                menuCategory: {
                    ...state.menuCategory,
                    open: action.payload,
                }
            };

            break;
        }

        case actionTypes.SET_OPEN_MENU_CUSTOMER_DATA: {
            newState = {
                ...state,
                menuCustomerData: {
                    ...state.menuCustomerData,
                    open: action.payload,
                }
            };

            break;
        }

        case actionTypes.SET_STORE: {
            newState = {
                ...state,
                store: action.payload
            };

            break;
        }

        case actionTypes.FETCH_FAVORITES: {
            newState = {
                ...state,
                favorites: {
                    ids: action.favorites,
                }
            };
            break;
        }

        case actionTypes.ADD_FAVORITE: {
            let newId = newState.favorites.ids;

            if (action.id === undefined) {
                newId = [];
            } else if (action.id !== null) {
                newId.push(action.id);
            } else if (action.url !== '') {
                newId.push(action.url);
            }

            localStorage.setItem('favorites', JSON.stringify(newId));

            newState = {
                ...state,
                favorites: {
                    ids: newId
                }
            };
            break;
        }

        case actionTypes.REMOVE_FAVORITE: {
            let newId = newState.favorites.ids;
            for (let i = 0; i < newId.length; i++) {
                if (newId[i] === action.id) {
                    newId.splice(i, 1);
                } else if (newId[i].url === action.id) {
                    newId.splice(i, 1);
                }
            }

            localStorage.setItem('favorites', JSON.stringify(newId));
            
            newState = {
                ...state,
                favorites: {
                    ids: newId
                }
            };
            break;
        }

        // default:
        //     return initialState;
    }

    return newState;
};

export default interfaceReducer;
