import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TTTGame from './TTT/TTTGame';
import TTTAdvancedGame from './TTT_Advanced/TTTAdvancedGame';
import LoginPage from './Login/LoginPage';
import RecordPage from './Record/RecordPage';
import OnlineTTTMenu from './Online/OnlineTTTMenu';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>Tic Tac Toe Main Page</h1>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src="/logo.png" width="30" height="30" alt=""/>Jonathan's Website
                        </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                                    <li className="nav-item"><Link to="/simple" className="nav-link">Simple</Link></li>
                                    <li className="nav-item"><Link to="/advanced" className="nav-link">Advanced</Link></li>
                                    <li className="nav-item"><Link to="/record" className="nav-link">Record</Link></li>
                                    <li className="nav-item"><Link to="/online" className="nav-link">Play Online</Link></li>
                                </ul>
                            </div>
                    </nav>
                        <hr></hr>
                        <Route path='/' exact component={LoginPage} />
                        <Route path='/simple' component={TTTGame} />
                        <Route path='/advanced' component={TTTAdvancedGame} />
                        <Route path='/record' component={RecordPage} />
                        <Route path='/online' component={OnlineTTTMenu}/>
                        <Route path='./game' component={TTTGame}/>
                </div>
            </Router>
                )
            }
        }
        
export default App;