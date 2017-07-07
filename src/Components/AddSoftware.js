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
        if(this.state.softwareAdded !=null){
            message.push(<span key='100'>{this.state.softwareAdded} added successfully &nbsp;
                         <button onClick={()=>{this.setState({softwareAdded: null})}}>Clear</button></span>);
        }
        
        this.state.categories.forEach(function(c){
            cat.push(
               <option key={c.tbl_software_typeid} value={c.tbl_software_typeid}>{c.software_type}</option>
            );
        });
        return(
           <div style={{ 'backgroundColor': '#ebebeb', padding:'20px'}}>
              <h2>Add Software</h2>
              <input type="text" ref="txtName" placeholder="Software Name"/>
              <select ref="selType">
                {cat}
              </select>
              <button onClick={this.postData}>Add</button>
            {/*<SoftwareList/>*/}
             <div style={{height:'40px'}}>{message}</div>
            </div>
        );
    }
}

export default AddSoftware;