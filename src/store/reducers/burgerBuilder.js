import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: null,
    purchasable: false,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}

const reducer = (state = initialState,action) => {
    //
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };

        case actionTypes.SET_INGREDIENTS:
            // A partir dos ingredientes teremos o preço inicial e dele dependerá o status de compra inicial..
            let myPrice = 0;
            let myPurchasable = false;
            for (let ingredient in action.ingredients) {
                myPrice += INGREDIENT_PRICES[ingredient] * action.ingredients[ingredient];
                if(action.ingredients[ingredient]>0){
                    myPurchasable = true;
                }
            }
            // Foi..
            return {
                ...state,
                // Desta forma, os ingredientes ficarão na ordem de cadastro no firebase..
                // ingredients: action.ingredients,
                // Desta outra forma, fixamos a ordem dos ingredientes na tela
                ingredients: {
                    salad: action.ingredients.salad,
                    meat: action.ingredients.meat,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon
                },
                totalPrice: myPrice,
                purchasable: myPurchasable,
                error: false
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
                totalPrice: null,
                purchasable: false
            };
    

        default:
            return state;
    }
}

export default reducer;