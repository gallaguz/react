import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Header, Footer} from './components';
import {Main as MainLayout} from './hoc';
import {About, Auth, Chat, Home} from './pages';

export const App = () => {
  // const callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };
  //
  // callApi()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));

  return (
    <MainLayout
      header={<Header />}
      footer={<Footer />}
    >
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/auth" component={Auth} />
        <Route path={['/chat/:id', '/chat']} component={Chat} />
        <Route path="/" component={Home} />
        <Route path="*" component={() => <h1>404</h1>} />
      </Switch>
    </MainLayout>
  );
};
