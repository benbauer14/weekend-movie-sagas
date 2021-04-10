import {HashRouter as Router, Route, useHistory} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Add from '../Add/Add'
import Details from '../Details/Details'
import Edit from '../Edit/Edit'

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
        <Route path='/Edit' exact>
          <Edit />
        </Route>
      </Router>
    </div>
  );
}


export default App;
