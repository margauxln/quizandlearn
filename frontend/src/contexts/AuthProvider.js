import React, {createContext, useContext, useReducer} from 'react';

//on crée un contexte = un changement d'état qui impactera tous les composants
export const AuthContext = createContext();

//on récupére l'utilisateur (son mail + token)
const userData = localStorage.getItem("user");

// déclaration des states globales
const initialState = {
    //quand tu recharges la page, quand les données de l'utilisateur existent on les récupère du local storage
    // JSON.parse = transforme la chaine de caractère en objet
    //pas de ; car objet
    user: userData ? JSON.parse(userData) : null
};

//pour eviter de mettre chaînes de caractère
export const actions = {
    HANDLE_USER: "handleUser"
};

// HOOK USE REDUCER = méthode qui va permettre de mettre à jour l'état global de l'application
const reducer = (state, action) => {
    if (action) {
        switch (action.payload) {
            case actions.HANDLE_USER:
                return {
                    ...state,
                    //ici on ve récupérer les données de l'utilisateur
                    user: action.payload
                }
            default:
                return state;
        }
    }
    return state;
};

/* const reducer = (state, params) => {
    if (params) {
        switch (params.action) {
            case actions.HANDLE_USER:
                return {
                    ...state,
                    //params.data = user.userData ?
                    user: params.data
                }
            default:
                return state;
        }
    }
    return state; */

//provider : on stock state globales de l'appli
export const AuthProvider = (props) => {

    let state = initialState;

    return (
        <AuthContext.Provider value={useReducer(reducer, state)}>
            {props.children}
        </AuthContext.Provider>
    )

};

export const useStateValue = () => useContext(AuthContext);
