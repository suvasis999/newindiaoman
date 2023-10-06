'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const getEvents = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const eventsList = await pool.request().query(sqlQueries.eventslist);
        return eventsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(eventId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const event = await pool.request()
                            .input('eventId', sql.Int, eventId)
                            .query(sqlQueries.eventbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}



const updateEvent = async (eventId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('eventId', sql.Int, eventId)
                        .input('eventTitle', sql.NVarChar(100), data.eventTitle)
                        .input('eventDescription', sql.NVarChar(1500), data.eventDescription)
                        .input('startDate', sql.Date, data.startDate)
                        .input('endDate', sql.Date, data.endDate)
                        .input('avenue', sql.NVarChar(200), data.avenue)
                        .input('maxMembers', sql.Int, data.maxMembers)
                        .query(sqlQueries.updateEvent);
                        
                        

        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEvent = async (eventId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteEvent = await pool.request()
                            .input('eventId', sql.Int, eventId)
                            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatEvent = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertEvent = await pool.request()
                            .input('eventTitle', sql.NVarChar(100), eventdata.eventTitle)
                            .input('eventDescription', sql.NVarChar(1500), eventdata.eventDescription)
                            .input('startDate', sql.Date, eventdata.startDate)
                            .input('endDate', sql.Date, eventdata.endDate)
                            .input('avenue', sql.NVarChar(200), eventdata.avenue)
                            .input('maxMembers', sql.Int, eventdata.maxMembers)
                            .query(sqlQueries.creatEvent);                            
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}



const getAppUserByEmail = async(appUser) => {
     try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const chkRecord = await pool.request()
        .input('emailID', sql.NVarChar(100), appUser)
                            .query(sqlQueries.appUserByEmail);
        
        return chkRecord.recordset;
    } catch (error) {
        return error.message;
    }
}
const creatAppuser = async (appUser) => {
    try {
        const otp=Math.floor(Math.random() * 90000) + 10000;
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertAppUser = await pool.request()
                            .input('fname', sql.NVarChar(100), appUser.fname)
                            .input('lname', sql.NVarChar(100), appUser.lname)
                            .input('emailID', sql.NVarChar(100), appUser.emailID)
                            .input('mobile', sql.NVarChar(20), appUser.mobile)
                            .input('userPass', sql.NVarChar(100), appUser.userPass)
                            .input('emailOtp', sql.NVarChar(20), appUser.emailOtp/*otp appUser.emailOtp*/)
                            .input('reg_date', sql.Date, appUser.reg_date)
                            .input('city', sql.NVarChar(50), appUser.city)
                            .input('addState', sql.NVarChar(50), appUser.addState)
                            .input('usrAddess', sql.NVarChar(255), appUser.usrAddess)
                            .input('isVerified', sql.Int, 0)
                            .query(sqlQueries.createAppuser);   
                            
                           

        return insertAppUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const postUserLogin = async(appUser) => {
    try {
       let pool = await sql.connect(config.sql);
       const sqlQueries = await utils.loadSqlQueries('events');
       const chkRecord = await pool.request()
       .input('emailID', sql.NVarChar(100), appUser.emailID)
       .input('userPass', sql.NVarChar(100), appUser.userPass)
       .query(sqlQueries.loginUser);
       
       return chkRecord.recordset;
   } catch (error) {
       return error.message;
   }
}

const postUserVerified = async(appUser) => {
    try {
       let pool = await sql.connect(config.sql);
       const sqlQueries = await utils.loadSqlQueries('events');
       const chkRecord = await pool.request()
       .input('emailID', sql.NVarChar(100), appUser.emailID)
       .input('emailOtp', sql.NVarChar(100), appUser.emailOtp)
       .query(sqlQueries.verifyUser);
       
       return chkRecord.recordset;
   } catch (error) {
       return error.message;
   }
}

const getVehicleMake = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const vehicleMakeList = await pool.request().query(sqlQueries.vehicleMake);
        return vehicleMakeList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getVehicleModel = async(appUser) => {
    console.log(appUser);
    try {
       let pool = await sql.connect(config.sql);
       const sqlQueries = await utils.loadSqlQueries('events');
       const chkRecord = await pool.request()
       .input('VT_code', sql.NVarChar(100), appUser.VT_code)
                           .query(sqlQueries.vehicleModel);
       
       return chkRecord.recordset;
   } catch (error) {
       return error.message;
   }
}

const getVehicleType = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const vehicleTypeList = await pool.request().query(sqlQueries.vehicleType);
        return vehicleTypeList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    getEvents,
    getById,
    creatEvent,
    updateEvent,
    deleteEvent,
    getAppUserByEmail,
    creatAppuser,
    postUserLogin,
    postUserVerified,
    getVehicleMake,
    getVehicleModel,
    getVehicleType
}