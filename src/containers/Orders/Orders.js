import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {

    // componentDidMount() {
    //     // console.log("Token -> " + this.props.token );
    //     this.props.onFetchOrders( this.props.token,this.props.userId );
    // }
    const { onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders( props.token, props.userId );
    }, [onFetchOrders]);

    // No local do render..
        let orders = <Spinner />;
        if (!props.loading) {
            orders = props.orders.map( ord => (
                        <Order 
                            key={ord.id}
                            ingredients={ord.ingredients}
                            price={ord.price}
                            date={ord.timestamp}
                            name={ord.orderData.name}
                            email={ord.orderData.email} />
                    ));
        }
        return (
            <div>{orders}</div>
        );
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,user) => dispatch( actions.fetchOrders(token,user))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orders,axios));