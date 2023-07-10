import { BrowserRouter, Route, Switch } from "react-router-dom";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

// Router function에서 toggleTheme 함수를 받기 위한 인터페이스 설정(ts 때문에 써야함)
interface IRouterProps {}

// Router component receives toggleTheme as a prop
function Router({}: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
