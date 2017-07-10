import React, {Component} from 'react';
import SoftwareModel from '../Models/SoftwareModel';
import CategoryModel from '../Models/CategoryModel';
//import {Link} from 'react-router-dom';
//import Header from './Components/Header';

class SoftwareList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            softwares: [],
            categories: [],
            currentCat : null
        }
        
        this.setData = this.setData.bind(this);
        this.deleteSoftwareByID = this.deleteSoftwareByID.bind(this);
        this.getSoftwareCategories = this.getSoftwareCategories.bind(this);
        this.getSoftwareList = this.getSoftwareList.bind(this);
        
        //instantiate the Software model
        this.sm = new SoftwareModel(); 
        this.cm = new CategoryModel();
    }
    
    componentWillMount(){
        this.getSoftwareList();
        this.getSoftwareCategories();        
    }
    
    getSoftwareList(){
        this.sm.getSoftwareList().then(function(data){
          this.setData(data);    
        }.bind(this)).catch(function(err){
            alert(err);
        });
    }
    
    getSoftwareCategories(){
        this.cm.getAllCategories().then(function(data){
            this.setData(data,"categories");
            this.setState({currentCat: data[0].software_type});
        }.bind(this)).catch(function(err){
            alert(err);
        })
    }
    
    setData(data,type = "software") {
        var s = this.state; 
        type === "software"?s.softwares = data: s.categories = data;
        this.setState(s);
    }

    deleteSoftwareByID(id) {
       this.sm.deleteSoftwareByID(id).then(function(resp){
            if(resp === 200){
                this.getSoftwareList();
            }
       }.bind(this)).catch(function(err){
           alert(err);
       });
    }
    

    render() {
          var soft = [];
          var cat = [];
        
          this.state.softwares.forEach(function (v) {
             if(v.software_type === this.state.currentCat){
                 soft.push(
                     <li  role='presentation' key ={v.software_id} className='list-group-item'>{v.software_name}
                     <button className='pull-right btn btn-danger btn-xs' onClick={()=>this.deleteSoftwareByID(v.software_id)}>Delete</button></li>
                 );
             }
           },this);
        
        
          this.state.categories.forEach(function(v){
             cat.push(
                 <li  key={v.tbl_software_typeid} className={this.state.currentCat === v.software_type?"active":""} onClick={() => this.setState({currentCat : v.software_type})}>{v.software_type}<span className='badge'>{v.total}</span></li>
             ); 
          },this);
            


         return(
           <div>
             <h2>Software Lists</h2>
             <div>
               <ul className ="software-nav nav nav-tabs">
                {cat}
               </ul>
             </div>
             <div className = "softwareList">
                 <ul className='list-group'>
                    {soft}
                 </ul>
             </div>
             </div>
         );
    }
}

export default SoftwareList;

