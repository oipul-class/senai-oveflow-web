import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { isSignedIn } from "./services/security";

const { BrowserRouter, Route, Switch, Redirect } = require("react-router-dom");
//Switch é o que ira fazer as trocas baseado nos Route's configurados

function PrivateRoute({children, ...rest}) {

    if (isSignedIn()) {
        return (<Route {...rest}>
            {children}
        </Route>);
    } else {
        return <Redirect to="/"/>
    }
}

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

                <PrivateRoute>
                    <Home/>
                </PrivateRoute>

            </Switch>
        </BrowserRouter>
    );
}

export default Router;