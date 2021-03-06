import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Preloader from "../common/preloader/preloader";
const Dialogs = React.lazy(() => import("./dialogs/dialogs"));
const UsersContainer = React.lazy(() => import("./users/usersContainer"));
const ProfileContainer = React.lazy(() => import("./profile/profileContainer"));
const Login = React.lazy(() => import("./login/login"));

function Content(props) {
  return (
    <div className="content">
      <Suspense fallback={<Preloader />}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={'/profile/'} />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={() => <Dialogs />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default Content;
