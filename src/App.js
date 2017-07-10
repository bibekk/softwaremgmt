import React, {Component} from 'react';
import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
   render(){
       return(
           <div>
           <Header />
             <div>
                    {this.props.children}
              </div>
           </div>
       );
   }
}

export default App;

