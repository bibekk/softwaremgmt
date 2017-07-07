import React from 'react';

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
        this.postData = this.postData.bind(this);
        this.getMaxID = this.getMaxID.bind(this);
        this.getData
    }
    
    componentWillMount(){
        this.getData();
    }
    
    setData(data) {
        var s = this.state; 
        s.users = data;
        this.setState(s);
    }
    
    getData(){
      fetch("http://localhost:3000/users",{
         method: 'get'        
      }).then(function(response){
          return response.json();
      }).then(function(data){
          this.setData(data);
      }.bind(this)).catch(function(err){
          alert(err);
      })
    }

    
    getMaxID(callback){
        fetch("http://localhost:3000/users/maxid",{
         method: 'get'        
      }).then(function(response){
          return response.json();
      }).then(function(data){
          callback(data[0].maxid + 1)
      }).catch(function(err){
          alert(err);
      })
    }
    
    postData(maxid){
        this.getMaxID(function(maxid){
            fetch("http://localhost:3000/users",{
               method: 'post',
               headers: new Headers({ 'Content-Type': 'application/json'}),
               body: JSON.stringify({Id: maxid , Title:  this.refs.txtName.value, Status: this.refs.selType.value})
            }).then(function(){
               this.getData();
            }.bind(this));
        }.bind(this));
    }
    
    

    
    render(){
        return(
           <div><ul>{
                    this.state.users.map(function(v,i){
                       return (
                            <li>{v.username}({v.type})</li>
                            );
                    })
                }
            </ul></div>
        );
    }
}

export default Users;