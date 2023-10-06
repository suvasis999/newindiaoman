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
                status: 'success',
                 data:{
                    data:"User Exists"
             }
            });
        }
        else{
            try {
                const data = req.body;
                const insert = await eventData.creatAppuser(data);
                console.log(data);
                res.status(200).json({
                    status: 'success',
                     data:{
                        data:insert,
                        sql:data.emailID
                 }
                });
        
                var transporter = nodemailer.createTransport({
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
                  });
              
            } catch (error) {
                res.status(400).send(error.message);
            }
        }
        
    }
    catch (error){
        res.status(400).send(error.message);
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
                 data:{
                    data:getRecord
             }
            });
        }
        else{
            res.status(200).json({
                status: 'failed',
                 data:"User not exists or Invalid Credential"
            });
        }
    }
    catch (error){
        res.status(400).send(error.message);
    }
}

const getUserVerified = async (req, res, next) => {
    try {
        const data = req.body;
        const userlist = await eventData.postUserVerified(data)
       if(userlist.length>0){
            res.status(200).json({
                status: 'success',
                data:{
                    data:userlist
                }
            });
        }
        else{
            res.status(200).json({
                status: 'fail',
                results: userlist.length,
                data:{
                    data:"User not exists"
                }
            });
        }
       
    } catch (error) {
        res.status(400).send(error.message);
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
    getUserVerified
}