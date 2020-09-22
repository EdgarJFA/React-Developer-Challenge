import React from 'react';
import { BrowserRouter ,Switch, Route } from 'react-router-dom';

import Landing from './Pages/Landing';
import GetCountries from './Pages/GetCountries';
import NotFound from './Pages/404';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/getcountries" exact component={GetCountries} />
            <Route path="*" exact component={NotFound} />
        </BrowserRouter>
    )
}

export default Routes;