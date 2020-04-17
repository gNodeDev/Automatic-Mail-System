const CORE = require('./../lib/core');
const _ = require('lodash');
const { users:userModel} = CORE.model;

// Create User or Create insert frunction
const createUser = (userObject) => {
    return new Promise((resolve, reject)=>{
        userObject.save(err => {
            if (err){
                reject(err);
            }
            resolve(userObject);
        }); 
    });   
}

// Get All Users
const getAllUsers = ()=>{
    return new Promise((resolve, reject)=>{
        userModel.find({}, (err, users)=>{
            if (err){
                reject(err); 
            }
            resolve(users); 
        });
    })

}

//  Get User Data by id
const getUserDataById = (userId) => { 
    return new Promise((resolve, reject)=>{
        userModel.findOne({_id:ObjectId(userId)}, ((err, userData)=>{
            if (err){
                reject(err); 
            }
            resolve(userData); 
        }));
    }); 
}

//  Get User Data by any token
const getUserDataByToken = (token) => { 
    return new Promise((resolve, reject)=>{
        userModel.findOne({emailToken:token}, ((err, userData)=>{
            if (err){
                reject(err); 
            }
            resolve(userData); 
        }));
    }); 
}

// Update User Data
const updateUserData = (condition, dataToUpdate) => {
    return new Promise((resolve, reject)=>{
        delete dataToUpdate._id; 
        userModel.findOneAndUpdate(condition, dataToUpdate,{new: true}, function(err, updatedDoc) {
            if (err) {
                reject(err); 
            }
            resolve(updatedDoc);    
        });
    }); 
}

module.exports = { createUser, getAllUsers, getUserDataById, getUserDataByToken,  updateUserData}