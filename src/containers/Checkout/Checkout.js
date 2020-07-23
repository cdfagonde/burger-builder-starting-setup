import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    // No local do render..
        let summary = <Redirect to="/" />;
        if (props.ings) {
            const purchasedRedirect = props.purchased && <Redirect to="/" /> ;
           summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler} />
                    <Route 
                        path={props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            )
        }
        return summary;
}

// Por enquanto, somente precisamos ler o state e não teremos dispatches
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(checkout);