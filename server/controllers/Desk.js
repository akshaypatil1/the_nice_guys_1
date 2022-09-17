
// Desk model
let store = require('../models/store');
let { success, failure } = require("../helpers/response");

function DeskController(){
    let findDesksByFloor = function(req){
        let found = store.store.Desks.filter(function(p){
            return p.floor === parseInt(req.params.floorId)
        });
        if(found && found.length > 0){
            return found;
        }
        return null;
    };

    this.getByFloorId = function(req,res,next){
        let found = findDesksByFloor(req);
        if(found){
            success(res,200,found,next);
        }else{
            failure(res,404,"Desks not found",next);
        }
    }

    this.getFloorDropdowns = function(req,res,next){
        let result={};
        result.floors = store.store.DeskMasterDetails.filter(function(p){
            return p.key === "floor";
        });

        result.zones = store.store.DeskMasterDetails.filter(function(p){
            return p.key === "zone";
        });

        success(res,200,result,next);
    }

    let findAllTeamMembers = function(managersPid,result){
        let pidList = store.store.Employee.filter(function(p){
            return managersPid.includes(p.managersPid)
        }).map(i=>i.pid);
        if(pidList.length>0){
            result.push(pidList);
            findAllTeamMembers(pidList,result);
        } else{
            result.push(pidList);
        }
       return result; 
    }

    this.getBookingsByManagersPid = function(req,res,next){
        let inputArray = [];
        inputArray=findAllTeamMembers(req.body.managersPid,inputArray);
        let output = store.store.Employee.filter(function(p){
            return inputArray.includes(p.managersPid)
        });
        if(output.length>0){
            success(res,200,output,next);
        }else{
            failure(res,400,"No data found",next);
        }
    }
};

module.exports = new DeskController();