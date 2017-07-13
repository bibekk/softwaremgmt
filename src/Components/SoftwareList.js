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
            currentCat : null,
            editModeIndex: null
        }
        
        this.setData = this.setData.bind(this);
        this.deleteSoftwareByID = this.deleteSoftwareByID.bind(this);
        this.getSoftwareCategories = this.getSoftwareCategories.bind(this);
        this.getSoftwareList = this.getSoftwareList.bind(this);
        
        //instantiate the Software model
        this.sm = new SoftwareModel(); 
        this.cm = new CategoryModel();
      //  
       // this.getSoftwareList();
        //this.getSoftwareCategories();
    }
    
    componentWillMount(){
        this.getSoftwareList();
        this.getSoftwareCategories();        
    }
    
    componentDidUpdate(prevProps,prevState){
        console.log(this.state,prevState);
        if(this.state !== prevState && this.state.softwares.length === 0){
            this.getSoftwareCategories();
            this.getSoftwareList();
        }
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
    
    updateSoftwareByID(id) {
       // console.log(id,this.refs.software_name.value);
       this.sm.updateSoftwareByID(id,this.refs.software_name.value).then(function(resp){
            if(resp === 200){
                this.setState({editModeIndex:null});
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
                 if(v.software_id !== this.state.editModeIndex){
                     soft.push(
                         <li  role='presentation' key ={v.software_id} className='list-group-item'>{v.software_name}
                            <button className='pull-right btn btn-danger btn-xs' onClick={()=>this.deleteSoftwareByID(v.software_id)}>Delete</button>
                            <button className='pull-right btn btn-primary btn-xs' onClick={()=>this.setState({editModeIndex: v.software_id})}>Edit</button>
                         </li>
                     );
                } else{
                    soft.push(
                         <li  role='presentation' key ={v.software_id} className='list-group-item'>
                            <div className='form-group'><input type='text' ref='software_name' defaultValue={v.software_name}/></div>
                            <div className='form-group'>
                                <button className=' btn btn-danger btn-xs' onClick={()=>this.updateSoftwareByID(v.software_id)}>Update</button>
                                <button className=' btn btn-primary btn-xs' onClick={()=>this.setState({editModeIndex: null})}>Cancel</button>
                            </div>
                         </li>
                     );                   
               }
             }
           },this);
        
        
          this.state.categories.forEach(function(v){
             cat.push(
                 <li  key={v.tbl_software_typeid} className={this.state.currentCat === v.software_type?"active":""} onClick={() => this.setState({currentCat : v.software_type})}><span>{v.software_type}</span>&nbsp;&nbsp;<span className='badge'>{v.total}</span></li>
             ); 
          },this);
            


         return(
           <div className='sl-container'>
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

