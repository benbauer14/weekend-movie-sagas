import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Add from '../Add/Add'
import Details from '../Details/Details'

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/Details" exact>
          <Details/>
        </Route>
        {/* Add Movie page */}
        <Route path="/Add" exact>
          <Add />
        </Route>
      </Router>
    </div>
  );
}


export default App;
