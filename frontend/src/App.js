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
          // propsの中にmatchを入れて、Foodsコンポーネントに渡す
          // matchには、URLの情報が入っている
          render = {(props) =>
            <Foods
              match={ props.match }
            />
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
