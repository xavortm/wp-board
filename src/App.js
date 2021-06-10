import { AuthContext, useProvideAuth, useAuth } from "./hooks/auth";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./pages/login";

const App = () => {
  return (
    <ProvideAuth>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <h1>Home page.</h1>
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <PrivateRoute path="/protected">
              <h1>Protected page</h1>
            </PrivateRoute>
          </Switch>
        </Router>
      </ChakraProvider>
    </ProvideAuth>
  );
};

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const PrivateRoute = ({ children, ...otherParams }) => {
  let auth = useAuth();

  return (
    <Route
      {...otherParams}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
