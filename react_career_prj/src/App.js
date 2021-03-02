import Dashboard from './components/Home';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/signIn" component={SignIn} />
    </div>
  );
}

export default App;
