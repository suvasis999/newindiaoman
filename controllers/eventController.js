'use strict';

const eventData = require('../data/events');
const nodemailer = require('nodemailer');

const getAllEvents = async (req, res, next) => {
    try {

        const eventlist = await eventData.getEvents();
        res.status(200).json({
        status: 'success',
        results: eventlist.length,
        data:{
            data:eventlist
        }
    });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDemodata = async (req, res, next) => {
    try {

        const eventlist = await eventData.getEvents();
        res.status(200).json({
        status: 'success',
        results: eventlist.length,
        data:{
            data:eventlist
        }
    });
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const addAppuser = async (req, res, next) => {
    try{
        const data = req.body;
        const getRecord = await eventData.getAppUserByEmail(data.emailID)
        if(getRecord.length>0){
            res.status(200).json({
                status: 'duplicate',
                message:'User Exists',
                data:"User Exists"
            });
        }
        else{
            try {
                const data = req.body;
                const insert = await eventData.creatAppuser(data);
                res.status(200).json({
                    status: 'success',
                    message:'Successfully Registered',
                    data:insert
                });

               /* const transporter = nodemailer.createTransport({
                    port: 465,
                    host: "smtp.gmail.com",
                    auth: {
                       
                    },
                    secure: true,
                });
                
                await new Promise((resolve, reject) => {
                    // verify connection configuration
                    transporter.verify(function (error, success) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            console.log("Server is ready to take our messages");
                            resolve(success);
                        }
                    });
                });
                
                const mailData = {
                    from: {
                        name: "webndro@gmail.com",
                        address: "myEmail@gmail.com",
                    },
                    replyTo:  data.emailID,
                    to:  data.emailID,
                    subject: "Account Validation OTP Sent",
                    text: "Account Validation OTP is "+data.emailOtp+"",
                    html: "Account Validation OTP is "+data.emailOtp+"",
                };
                
                await new Promise((resolve, reject) => {
                    // send mail
                    transporter.sendMail(mailData, (err, info) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            console.log(info);
                            resolve(info);
                        }
                    });
                });*/
                
              //  res.status(200).json({ status: "OK" });
        
               /* var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'webndro@gmail.com',
                      pass: 'qgwg jrqo vrnn tusf'
                    }
                  });
                  
                  var mailOptions = {
                    from: "webndro@gmail.com",
                    to: data.emailID,
                    subject: "Account Validation OTP Sent",
                    text: "Account Validation OTP is "+data.emailOtp+""
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log("email error",error);
                    } else {
                      console.log('Email sent: ' + info.response);
                     
                    }
                  });*/
              
            } catch (error) {
                res.status(400).json({
                    status: 'failed',
                    message:'failed',
                   data:error.message
                });
            }
        }
        
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
   
}

const postVehicleQuote=async(req, res, next)=>{
    try{
        const data = req.body;
        const insert = await eventData.creatVehiclePost(data);
         res.status(200).json({
                    status: 'success',
                    message:'Successfully Posted',
                    data:insert
                });
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const creatMapCustID=async(req, res, next)=>{
    try{
        const data = req.body;
        const insert = await eventData.creatMapCustID(data);
         res.status(200).json({
                    status: 'success',
                    message:'Successfully Mapped',
                    data:insert
                });
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const getcustQuoteList=async(req,res, next) =>{
    try{
        const data = req.body;
        const insert = await eventData.getcustQuoteList(data);
         res.status(200).json({
                    status: 'success',
                    message:'Successfully Fetched Data',
                    data:insert
                });
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const insDrivelistquote=async(req,res, next) =>{
    try{
        const data = req.body;
        const insert = await eventData.insDrivelistquote(data);
         res.status(200).json({
                    status: 'success',
                    message:'Successfully Data Inserted',
                    data:insert
                });
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}


const getUserLogin = async (req, res, next) => {
    try{
        const data = req.body;
        const getRecord = await eventData.postUserLogin(data)
        console.log(getRecord);
        if(getRecord.length>0){
            res.status(200).json({
                status: 'success',
                message:'Sucessfully Login',
                 data:getRecord
             
            });
        }
        else{
            res.status(200).json({
                status: 'failed',
                message:'User not exists or Invalid Credential',
                data:"User not exists or Invalid Credential"
            });
        }
    }
    catch (error){
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const getUserVerified = async (req, res, next) => {
    try {
        const data = req.body;
        const userlist = await eventData.postUserVerified(data)
       if(userlist.length>0){
            res.status(200).json({
                status: 'success',
                message:'Sucessfully Verified',
                data:userlist
              });
        }
        else{
            res.status(200).json({
                status: 'failed',
                message:'User not exists',
                data:"User not exists"
                
            });
        }
       
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const getVechleMake = async (req, res, next) => {
    try {
        const makeList = await eventData.getVehicleMake();
        res.status(200).json({
            status: 'success',
            message:'Sucessfully Fetched',
            data:makeList
            
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const getVechleModel = async (req, res, next) => {
    try {
        const data = req.body;
        const modelList = await eventData.getVehicleModel(data);
       // console.log(modelList);
        if(modelList.length>0){
            res.status(200).json({
                status: 'success',
                message:'Sucessfully Fetched',
                data:modelList,
                
            });
        }
        else{
            res.status(200).json({
                status: 'failed',
                message:'Model not available',
                data:"Model not available"
                
            });
        }
       
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const getVechleType = async (req, res, next) => {
    try {
        const typeList = await eventData.getVehicleType();
        res.status(200).json({
            status: 'success',
            message:'Successfully fetched',
             data:typeList
            
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message:'failed',
            data:error.message
        });
    }
}

const getEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await ev
        entData.getById(eventId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.creatEvent(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatEvent = async (req, res, next) => {
    try {
        const eventId =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateEvent(eventId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await eventData.deleteEvent(eventId);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEvents,
    getEvent,
    addEvent,
    updatEvent,
    deleteEvent,
    getDemodata,
    addAppuser,
    getUserLogin,
    getUserVerified,
    getVechleMake,
    getVechleModel,
    getVechleType,
    postVehicleQuote,
    creatMapCustID,
    getcustQuoteList,
    insDrivelistquote
}