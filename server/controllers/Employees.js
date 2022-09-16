
// Employee model
let store = require('../models/store');
let { success, failure } = require("../helpers/response");

function EmployeesController(){
    let findProductById = function(req){
        let found = store.store.Employee.filter(function(p){
            return p.id === parseInt(req.params.id)
        });
        if(found && found.length > 0){
            return found[0];
        }
        return null;
    };

    this.get = function(req,res,next){
       success(res,200,store.store.Employee,next);
    };

    this.getById = function(req,res,next){
        let found = findProductById(req);
        if(found){
            success(res,200,found,next);
        }else{
            failure(res,404,"Product not found",next);
        }
    };

    this.post = function(req,res,next){
        console.log(req.body.name)
        {
            let index = store.store.Employee.length + 1;
            dataObject = {
                id : parseInt(index),
                name : req.body.name
            };
            store.store.Employee.push(dataObject);
            success(res,201,dataObject,next);
        }
    };

    this.put = function(req,res,next){
        {
            let found = findProductById(req);
            if(found){
                found.name = req.body.name;
                success(res,200,found,next);
            }else{
                failure(res,404,"Product not found",next);
            }
        }
    };

    this.del = function(req, res, next){
        store.store.Employee = store.store.Employee.filter(function(p){
            return p.id !== parseInt(req.params.id)
        });
        success(res,200,{},next);
    }
};

module.exports = new EmployeesController();