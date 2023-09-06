import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// コンポーネント
import { Restaurants }  from './containers/Restaurants.jsx';
import { Foods }        from './containers/Foods.jsx';
import { Orders }       from './containers/Orders.jsx';

function App() {
  return (
    <Router>
      <Switch>

        {/* レストラン一覧ページ */}
        <Route
          exact
          path="/restaurants"
          render = {() =>
            <Restaurants />
          }
        />

        {/* フード一覧ページ */}
        <Route
          exact
          path="/restaurants/:restaurantsId/foods"
          render = {({ match }) =>
            <Foods match={ match } />
          }
        />

        {/* 注文ページ */}
        <Route
          exact
          path="/orders"
          render = {() =>
            <Orders />
          }
        />

      </Switch>
    </Router>
  );
}

export default App;
