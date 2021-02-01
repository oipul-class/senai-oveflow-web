import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const { BrowserRouter, Route, Switch } = require("react-router-dom");
//Switch é o que ira fazer as trocas baseado nos Route's configurados

//roterizador do navegador
function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>

                <Route path="/register">
                    <Register/>
                </Route>

                <Route path="/home">
                    <Home/>
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default Router;