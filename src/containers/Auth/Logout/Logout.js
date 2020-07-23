import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';


const logout = props =>{
    // componentDidMount() {
    //     this.props.onLogout();
    // }
    const { onLogout } = props;
    useEffect(() => {
        onLogout();
    }, [onLogout]);

    // No lugar do render
        return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( actions.logout())
    };
};

export default connect(null,mapDispatchToProps)(logout);