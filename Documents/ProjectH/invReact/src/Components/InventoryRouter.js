import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Inventory from './Inventory';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider } from './AuthContext';
import MenuBar from './MenuBar'



function InventoryRouter() {
    return (
        <div>
            
                <AuthProvider>
                    <Router>
                    <MenuBar>

                    </MenuBar>
                    
                    <Switch>
                        
                        <Route path="/signin" component={SignIn}></Route>
                            
                        <Route path="/signup" component={SignUp}></Route>
                            
                        <Route path="/" component={Inventory}></Route>
                            
                        
                    </Switch>
                    </Router>
                </AuthProvider>
            

        </div>
    );
}

export default InventoryRouter;
