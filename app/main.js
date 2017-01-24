import React from 'react';
import {Router, useRouterHistory} from 'react-router';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

let history = useRouterHistory(createBrowserHistory)({queryKey:false});

ReactDOM.render(<Router history={history}>
                  {routes}
                </Router>,
                document.getElementById('app'));
