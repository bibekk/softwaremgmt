import React from 'react';

class CategoryModel extends React.Component{
    constructor(){
         super();
         this._api = "http://localhost:3000";
      //   this.getSoftwareList = this.getSoftwareList.bind(this);
     }
    
     getAllCategories() { 
        var _api = this._api; 
        var fHeaders = new Headers();
        fHeaders.append('Cache-control','no-cache');
         
        return new Promise(function (resolve, reject) {  
            fetch(_api + "/Softwares/category", {
                method: 'get',
                headers: fHeaders
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        });
    }
    
       
    deleteCategoryByID(id){
        var _api = this._api;
        return new Promise(function(resolve, reject){
            fetch(_api + "/Softwares/category/" + id, {
               method: 'delete'
            }).then(function (response) {
                if (response.status === 200) {
                    resolve(200);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    
    
    postCategory(software_type){
        var _api = this._api;
        return new Promise(function(resolve, reject) {
            fetch( _api +"/Softwares/category",{
                method: 'post',
                headers: new Headers({'Content-Type':'application/json'}),
                body: JSON.stringify({software_type: software_type})
            }).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err);
            })
        });
    }
    
    updateCategory(cat_id, software_type){
        var _api = this._api;
        return new Promise(function(resolve, reject){
            fetch(_api  + "/Softwares/category/"+cat_id, {
                method: 'put',
                headers: new Headers({ 'Content-Type': 'application/json'}),
                body: JSON.stringify({tbl_software_typeid: cat_id , software_type: software_type})
            }).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                alert(err);
            })
        })
    }
}

export default CategoryModel;