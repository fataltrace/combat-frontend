import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import BaseLayout from './containers/BaseLayout/index.jsx'
import HomePage from './containers/HomePage/index.jsx'
import CameraPage from './containers/CameraPage/index.jsx'
import NotFoundPage from './containers/NotFoundPage/index.jsx'
import {
  ROUTE_ROOT,
  ROUTE_CAMERAS
} from './constants.js'

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <Switch>
        <Route excat path={ROUTE_ROOT}>
          <BaseLayout>
            <Switch>
              <Route exact path={ROUTE_ROOT} component={HomePage} />
              <Route exact path={ROUTE_CAMERAS} component={CameraPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </BaseLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  window.document.getElementById('root')
)