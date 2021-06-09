import { createContext, useContext, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const App = () => {
  return (
    <ProvideAuth>
      <ChakraProvider>
        <Router>
          <AuthButton />

          <Switch>
            <Route exact path="/">
              <h1>Home page.</h1>
            </Route>

            <Route path="/login">
              <h1>Login page</h1>
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

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const AuthButton = () => {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? <p>Welcome</p> : <p>You are not logged in.</p>;
};

const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return () => {
      setUser("user");
      cb();
    };
  };

  const signout = (cb) => {
    return () => {
      setUser(null);
      cb();
    };
  };

  return {
    user,
    signin,
    signout,
  };
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
