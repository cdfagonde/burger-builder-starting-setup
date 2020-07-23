import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from  '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// import * as actionTypes from '../../store/actions/actionTypes';
// import * as actionCreators from '../../store/actions/burgerBuilder';
import * as burgerBuilderActions from '../../store/actions/index';

const burgerBuilder = props => {

    // Ingredients será montado como key-value pairs:
    // key corresponde ao ingrediente; value corresponde à quantidade
    // state = {
    //     purchasing: false
    // };
    const [purchasing,setPurchasing] = useState(false);

    // Aqui vamos de useDispatch
    const dispatch = useDispatch();
    const onIngredientAdded     = (i) => dispatch( burgerBuilderActions.addIngredient(i));
    const onIngredientRemoved   = (i) => dispatch( burgerBuilderActions.removeIngredient(i));
    const onInitPurchase        = ()  => dispatch( burgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath = (p) => dispatch( burgerBuilderActions.setAuthRedirectPath(p));
    const onInitIngredients     = useCallback(()  => {
        return dispatch(burgerBuilderActions.initIngredients());
    }, [dispatch]);   // Eu acho que esta dependencia não eh necessária
    
    // Logicamente, useSelector tb está no jogo..
    // const var = useSelector( state => return state.algumaCoisa );
    const ings = useSelector( state => state.burgerBuilder.ingredients );
    const tprc = useSelector( state => state.burgerBuilder.totalPrice );
    const error = useSelector( state => state.burgerBuilder.error );
    const isAuthenticated = useSelector( state => state.auth.token !== null );

    // componentDidMount() {
    //     // console.log(this.props);
    //     this.props.onInitIngredients();
    // }
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    }, 0);
        return (sum > 0);
    }

    const purchaseHandler = () => {
        if(isAuthenticated){
            // Somente vamos abrir o modal se estivermos autenticados
            // this.setState({ purchasing: true });
            setPurchasing(true);
        } else {
            // Neste caso vamos redirecionar para a página de login
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const purchaseCancelHandler = () => {
        // this.setState({ purchasing: false });
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        // Agora com Redux, só precisamos mudar de página sem precisar passar nada..
        props.history.push('/checkout');
    }

    // No lugar do render..
        const disabledInfo = {
            ...ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        // Resumo do pedido será montado após termos a lista de ingredientes
        let orderSummary = null;
        // Tanto o burquer quando os controles, serão mostrados somente após a leitura dos ingredientes..
        let burger = error ? <p>Cannot load ingredients!</p> : <Spinner />;

        if(ings) {
            // Já temos os ingredientes, então podemos seguir
            burger = (
                <Aux>
                    <Burger ingredients={ings} />
                    <BuildControls 
                        ingredientAdded={ onIngredientAdded }   /* O parametro é incluido dentro de BuildControls */
                        ingredientRemoved={ onIngredientRemoved }  /* O parametro é incluido dentro de BuildControls */
                        disabled={disabledInfo}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                        price={tprc}
                        purchasable={updatePurchaseState(ings)} />
                </Aux>
            );
            // Tb podemos montar o resumo do pedido
            orderSummary = <OrderSummary
                                ingredients={ings}
                                price={tprc}
                                purchaseCancelled={purchaseCancelHandler}
                                purchaseContinued={purchaseContinueHandler} />;
        }

        // Enquanto estiver carregando, no lugar do resumo mostraremos o spinner
        // if(this.state.loading){
        //     orderSummary = <Spinner />;
        // }
        
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

}


/*
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tprc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (i) => dispatch( burgerBuilderActions.addIngredient(i)),
        onIngredientRemoved: (i) => dispatch( burgerBuilderActions.removeIngredient(i)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (p) => dispatch(burgerBuilderActions.setAuthRedirectPath(p))
    }
};

// Lindo caso de 2 wrapping elements
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( burgerBuilder,axios ));
*/

// Agora que usamos useSelector e useDispatch, não precisamos mais do connect
export default withErrorHandler( burgerBuilder,axios );
