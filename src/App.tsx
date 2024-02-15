import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import store from './reduxstore/store';
import { Provider } from 'react-redux';


const App=()=> {
  return (
    <div className="App">
      <Provider store={store}>
         <Home/>
      </Provider>
      
    </div>
  );
}

export default App;
