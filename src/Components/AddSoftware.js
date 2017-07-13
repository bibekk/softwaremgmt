import React from 'react';
import CategoryModel from '../Models/CategoryModel';
import SoftwareModel from '../Models/SoftwareModel';
//import SoftwareList from './SoftwareList';

class AddSoftware extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            categories: [],
            softwareAdded:null
        }
        this.postData = this.postData.bind(this);
        
        this.cm = new CategoryModel();
        this.sm = new SoftwareModel();
    }
    
    componentWillMount(){
        this.getCategories();
    }
    
    getCategories() {
        this.cm.getAllCategories().then(function(data){
            this.setState({categories:data});
        }.bind(this)).catch(function(err){
            alert(err);
        })
    }

    postData(){
       this.sm.addSoftware(this.refs.txtName.value, this.refs.selType.value).then(function(data){  
           if(data === 200){
              this.setState({softwareAdded: this.refs.txtName.value});
              this.refs.txtName.value = "";
           }
       }.bind(this)).catch(function(err){
           alert(err);
       })
    }
    
    
    
    render(){
        var cat=[];
        var message = [];
        if(this.state.softwareAdded !== null){
            message.push(<div className='alert alert-success' key='100'>{this.state.softwareAdded} added successfully &nbsp;
                         <button className='btn btn-info' onClick={()=>{this.setState({softwareAdded: null})}}>Close</button></div>);
        }
        
        this.state.categories.forEach(function(c){
            cat.push(
               <option key={c.tbl_software_typeid} value={c.tbl_software_typeid}>{c.software_type}</option>
            );
        });
        return(
           <div className='sl-container'>
              <h2>Add Software</h2>
              <div className='form-group'>
                <input className='form-control' type="text" ref="txtName" placeholder="Software Name"/>
              </div>
              <div className='form-group'>
                 <select className='form-control' ref="selType">
                    {cat}
                </select>
              </div>
              <button className='btn btn-primary' onClick={this.postData}>Add</button>
            {/*<SoftwareList/>*/}
            <br/><br/>
                {message}
            </div>
        );
    }
}

export default AddSoftware;