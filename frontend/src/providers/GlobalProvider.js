import React, {createContext, useContext, useReducer} from 'react';

export const GlobalContext = createContext();

//pour eviter de mettre chaînes de caractère
export const actions = {
    HANDLE_USER: "handleUser"
};

const userData = localStorage.getItem("user");

// déclaration des states globales
const initialState = {
    //quand tu recharges la page, quand les données de l'utilisateur existent on les récupère du local storage
    // JSON.parse = transforme la chaine de caractère en objet
    //pas de ; car objet
    user: userData ? JSON.parse(userData) : null
};


// méthode qui va permettre de mettre à jour les states
const reducer = (state, params) => {
    if (params) {
        switch (params.action) {
            case actions.HANDLE_USER:
                return {
                    ...state,
                    user: params.data
                }
            default:
                return state;
        }
    }
    return state;
};

//provider : on stock state globales de l'appli
export const GlobalProvider = (props) => {

    let state = initialState;

    return (
        <GlobalContext.Provider value={useReducer(reducer, state)}>
            {props.children}
        </GlobalContext.Provider>
    )

};

export const useStateValue = () => useContext(GlobalContext);
