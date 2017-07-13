import React from 'react';

class SoftwareModel extends React.Component{
     constructor(){
         super();
         this._api = "http://192.168.1.131:3000";
         this.getMaxID = this.getMaxID.bind(this);
         this.addSoftware = this.addSoftware.bind(this);
     }
    
     getSoftwareList() { 
        var _api = this._api; 
        var fHeaders = new Headers();
        fHeaders.append('Cache-control','no-cache');
         
        return new Promise(function (resolve, reject) {  
            fetch(_api +"/Softwares", {
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
    

    deleteSoftwareByID(id){
        var _api = this._api;
        return new Promise(function(resolve, reject){
            fetch(_api + "/Softwares/" + id, {
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
    
    getMaxID() {
        var _api = this._api;
        return new Promise(function (resolve, reject) {
            fetch( _api + "/Softwares/maxid", {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(Number(data[0].maxid) + 1)
            }).catch(function (err) {
                reject(err);
            })
        });
    }
    

    addSoftware(software_name, software_type){
        //need to do this in order for the promise to access it
        var _this = this;
        
        return new Promise(function( resolve, reject){
             _this.getMaxID().then(function(maxid){ 
                 fetch( _this._api +"/Softwares",{
                   method: 'post',
                   headers: new Headers({ 'Content-Type': 'application/json'}),
                   body: JSON.stringify({software_id: maxid , software_name:  software_name, software_type: software_type})
                }).then(function(){
                    resolve(200);
                }).catch(function(err){
                    reject(err);
                 });
            }).catch(function(err){
                alert(err);
            }); 
        })
    }
    
    updateSoftwareByID(id, software_name){
        var _api = this._api;
        return new Promise(function(resolve, reject){
            fetch(_api  + "/Softwares/"+id, {
                method: 'put',
                headers: new Headers({ 'Content-Type': 'application/json'}),
                body: JSON.stringify({software_id: id , software_name: software_name})
            }).then(function (data) {
                resolve(200);
            }).catch(function (err) {
                alert(err);
            })
        })
    }
}

export default SoftwareModel;