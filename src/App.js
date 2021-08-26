
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddPoll from './pages/AddPoll';
import EditPoll from './pages/EditPoll';
import Home from './pages/Home';


function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/AddPoll" component={AddPoll} />
				<Route exact path="/EditPoll/:id" component={EditPoll} />
			</Switch>
		</div>
	);
}

export default App;
