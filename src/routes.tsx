import React from 'react';
import { BrowserRouter ,Switch, Route } from 'react-router-dom';

import Landing from './Pages/Landing';
import GetCountries from './Pages/GetCountries';
import NotFound from './Pages/404';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/listofcountries" exact component={GetCountries} />
                <Route path="*" exact component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;