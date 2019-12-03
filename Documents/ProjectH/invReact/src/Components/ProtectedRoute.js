import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer, AuthContext } from './AuthContext';

export default function PortectedRoute({ component: Component, ...rest }) {
    let { authenticated } = useContext(AuthContext)

    return (
        <AuthConsumer>
            {({ authorization }) => (
                <Route
                    render={props =>
                        authenticated ? <Component {...props} /> : <Redirect to="/" />
                    }
                    {...rest}
                />
            )}
        </AuthConsumer>
    )
}