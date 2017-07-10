import React from 'react';
import ReactDOM from 'react-dom';
//Router
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
//import Header from './Components/Header';
import AddSoftware from './Components/AddSoftware';
import SoftwareList from './Components/SoftwareList';
import SoftwareCategory from './Components/SoftwareCategory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
//bootstrap



ReactDOM.render((
    <BrowserRouter>
           <div>
            <Route path="/" component = {App} />
            <Route exact path ="/" component ={SoftwareList} />
            <Route path ="/AddSoftware" component={AddSoftware}/>
            <Route path = "/Categories" component={SoftwareCategory}/>
            <Route path ="/Categories/:id" component={SoftwareList} />
          </div>
    </BrowserRouter>
   ),
    document.getElementById('root')
);

registerServiceWorker();