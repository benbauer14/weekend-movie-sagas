import {HashRouter as Router, Route} from 'react-router-dom';
import { useHistory } from 'react-router';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Add from '../Add/Add'
import Details from '../Details/Details'
import Edit from '../Edit/Edit'


function App() {


  return (
    <div className="App">

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
