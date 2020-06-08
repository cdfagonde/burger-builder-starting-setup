import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class BurgerBuilder extends Component {

    // Ingredients será montado como key-value pairs:
    // key corresponde ao ingrediente; value corresponde à quantidade
    state = {
        purchasing: false
    };

    componentDidMount() {
        // console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    }, 0);
        return (sum > 0);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        // Agora com Redux, só precisamos mudar de página sem precisar passar nada..
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        // Resumo do pedido será montado após termos a lista de ingredientes
        let orderSummary = null;
        // Tanto o burquer quando os controles, serão mostrados somente após a leitura dos ingredientes..
        let burger = this.props.error ? <p>Cannot load ingredients!</p> : <Spinner />;

        if(this.props.ings) {
            // Já temos os ingredientes, então podemos seguir
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={ this.props.onIngredientAdded }   /* O parametro é incluido dentro de BuildControls */
                        ingredientRemoved={ this.props.onIngredientRemoved }  /* O parametro é incluido dentro de BuildControls */
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        price={this.props.tprc}
                        purchasable={this.updatePurchaseState(this.props.ings)} />
                </Aux>
            );
            // Tb podemos montar o resumo do pedido
            orderSummary = <OrderSummary
                                ingredients={this.props.ings}
                                price={this.props.tprc}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />;
        }

        // Enquanto estiver carregando, no lugar do resumo mostraremos o spinner
        // if(this.state.loading){
        //     orderSummary = <Spinner />;
        // }

        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tprc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (i) => dispatch( burgerBuilderActions.addIngredient(i)),
        onIngredientRemoved: (i) => dispatch( burgerBuilderActions.removeIngredient(i)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
};

// Lindo caso de 2 wrapping elements
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder,axios ));
