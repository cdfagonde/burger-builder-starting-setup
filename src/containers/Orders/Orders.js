import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then( res => {
                console.log(res.data);
                let theOrders = [];
                for ( let key in res.data ){
                    theOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log( theOrders );
                this.setState({ loading: false, orders: theOrders });
            })
            .catch( err => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map( ord => (
                    <Order 
                        key={ord.id}
                        ingredients={ord.ingredients}
                        price={ord.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);