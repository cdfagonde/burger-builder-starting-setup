import React, { Component } from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    // Ingredients será montado como key-value pairs:
    // key corresponde ao ingrediente; value corresponde à quantidade
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-burger-builder-dbdf6.firebaseio.com/ingredients.json')
            .then( response => {
                const ingredients = response.data;
                let price = this.state.totalPrice;
                let purchasable = this.state.purchasable;
                for (let ingredient in ingredients) {
                    price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
                    if(ingredients[ingredient]>0){
                        purchasable = true;
                    }
                }
                this.setState({
                    ingredients: ingredients,
                    totalPrice: price,
                    purchasable: purchasable
                });
            })
            .catch( error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    }, 0);
        this.setState({ purchasable: (sum > 0) });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }  

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert("You continue!");
        this.setState({ loading: true });
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Daniel',
                address: {
                    street: '1, Street Name',
                    zipCode: '09175-130',
                    country: 'Brasil'
                },
                email: 'text@text.com'
            },
            deliveryMethod: 'fastest',
            timestamp: dateTime
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false  });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        // Resumo do pedido será montado após termos a lista de ingredientes
        let orderSummary = null;
        // Tanto o burquer quando os controles, serão mostrados somente após a leitura dos ingredientes..
        let burger = this.state.error ? <p>Cannot load ingredients!</p> : <Spinner />;

        if(this.state.ingredients) {
            // Já temos os ingredientes, então podemos seguir
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable} />
                </Aux>
            );
            // Tb podemos montar o resumo do pedido
            orderSummary = <OrderSummary
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />;
        }

        // Enquanto estiver carregando, no lugar do resumo mostraremos o spinner
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        
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

export default withErrorHandler(BurgerBuilder,axios);
