import React, {Component} from 'react';
import CategoryModel from '../Models/CategoryModel';
//import Header from './Components/Header';

class SoftwareCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            softwares: [],
            categories : [],
            editModeIndex :  null,
            addMode: null
        }
        this.setData = this.setData.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        this.deleteCategoryByID = this.deleteCategoryByID.bind(this);
        
        this.addCategory = this.addCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        
        this.cm = new CategoryModel();
    }
    
    componentWillMount(){
        this.getAllCategories();
    }

    setData(data) {
        var s = this.state; 
        s.categories = data;
        this.setState(s);
    }


    getAllCategories() {
        this.cm.getAllCategories().then(function(data){
            this.setData(data);
        }.bind(this)).catch(function(err){
            alert(err);
        })
    }
    
    
    updateCategory(id){
         this.cm.updateCategory(id, this.refs.software_type.value).then(function(data){
            this.setState({editModeIndex: null});
            this.getAllCategories();
        }.bind(this)).catch(function(err){
            alert(err);
        })
    }
    
    addCategory(){
        this.cm.postCategory(this.refs.cat.value).then(function(data){
            this.setState({addMode:false});
            this.getAllCategories();
        }.bind(this)).catch(function(err){
            alert(err);
        })
    }
    
    deleteCategoryByID(id) {
         this.cm.deleteCategoryByID(id).then(function(resp){
             if(resp === 200){
                 this.getAllCategories();
             }
        }.bind(this)).catch(function(err){
            alert(err);
        })
    }
    

    render() {
          var cat = [];
          var addCat = [];
          this.state.categories.forEach(function (v) {
             if(v.tbl_software_typeid !== this.state.editModeIndex){
                 cat.push(
                    <li className='list-group-item' key ={v.tbl_software_typeid}>{v.software_type} 
                     <button className='pull-right btn btn-xs btn-danger' onClick={()=>this.deleteCategoryByID(v.tbl_software_typeid)}>Delete</button>
                     <button className='btn btn-primary btn-xs pull-right' onClick={()=>{ this.setState({editModeIndex: v.tbl_software_typeid})} }>Edit</button>
                    </li>
                    );
             }else{
                 cat.push(
                   <li key ={v.tbl_software_typeid}>
                        <div>
                            <div className='form-group'>
                                <input type="text" ref="software_type" className='form-control' defaultValue={v.software_type} />
                            </div>
                            <button className='btn btn-primary ' onClick={()=>this.updateCategory(v.tbl_software_typeid)}>Update</button>
                            <button className='btn btn-danger ' onClick={()=>{  this.setState({editModeIndex:null}) }}>Cancel</button>
                        </div>
                   </li>
                 );
             }
           },this);
           
           if(this.state.addMode){
               addCat.push(<div key='100'><br/>
                           <div className='form-group'>
                                <input placeholder='Category' type='text' className='form-control' ref='cat'/>
                           </div>
                           <div className='form-group'>
                                <button className='btn btn-primary' onClick={this.addCategory}>Add</button>
                                <button className='btn btn-danger' onClick={()=>{this.setState({addMode: false})}}>Cancel</button>
                            </div>

                            </div>);

           }

         return(
           <div className='sl-container'>
                 <h2>Software Categories</h2>
                 <div>
                    <button className='btn btn-primary'><span className='glyphicon glyphicon-plus' onClick={()=>{this.setState({addMode: true})}}>Add</span></button>
                 {addCat}
                 </div>
                <br/><br/>
                 <span className='label label-info'>{this.state.categories.length} categories</span>
                 <ul className='list-group'>
                    {cat}
                 </ul>
            </div>
         );
                  

    }
}

export default SoftwareCategory;

