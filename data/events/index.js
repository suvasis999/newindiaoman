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
        const vehicleMakeList = await pool.request().query(sqlQueries.vehicleMake2);
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


const creatVehiclePost = async (appUser) => {
    console.log('dfjd',appUser);
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertAppUser = await pool.request()
                            .input('Quote_NO', sql.VarChar(14), appUser.Quote_NO)
                            .input('BIRTH_DT', sql.DateTime, appUser.BIRTH_DT)
                            .input('VEHUSG_CODE', sql.Int, appUser.VEHUSG_CODE)
                            .input('VEHUSG_NAME', sql.VarChar(15), appUser.VEHUSG_NAME)
                            .input('Mortage', sql.VarChar(250), appUser.Mortage)
                            .input('CRNO', sql.Char(20), appUser.CRNO)
                            .input('LICENCE_DT', sql.DateTime, appUser.LICENCE_DT)
                            .input('LICENCE_NO', sql.Char(10), appUser.LICENCE_NO)
                            .input('PPType', sql.Char(1), appUser.PPType)
                            .input('PrevInsurer', sql.VarChar(250), appUser.PrevInsurer)
                            .input('PrevExpDt', sql.DateTime, appUser.PrevExpDt)

                            .input('REGNO', sql.Char(20), appUser.REGNO)
                            .input('CHASIS', sql.Char(20), appUser.CHASIS)
                            .input('ENGINENO', sql.Char(20), appUser.ENGINENO)
                            .input('HPCC', sql.Char(20), appUser.HPCC)
                            .input('VM_code', sql.Int, appUser.VM_code)
                            .input('VM_MAKE', sql.VarChar(50), appUser.VM_MAKE)
                            .input('BODY_CODE', sql.Char(10), appUser.BODY_CODE)
                            .input('BODYTY', sql.VarChar(50), appUser.BODYTY)
                            .input('COLOUR', sql.Char(20), appUser.COLOUR)
                            .input('PLMANUF', sql.Char(20), appUser.PLMANUF)

                            .input('EMPWT', sql.Numeric(18,3), appUser.EMPWT)
                            .input('MFGYEAR', sql.Numeric(18,3), appUser.MFGYEAR)
                           .input('LOADWT', sql.Numeric(18,3), appUser.LOADWT)
                            .input('TOTWT', sql.Numeric(18,3), appUser.TOTWT)
                            .input('MODEL', sql.Int, appUser.MODEL)
                            .input('SEATS', sql.Int, appUser.SEATS)
                            .input('SeatingCapacity', sql.Int, appUser.SeatingCapacity)
                            .input('ROP_NO', sql.Numeric(10,0), appUser.ROP_NO)
                            .input('Cov_Type', sql.VarChar(4), appUser.Cov_Type)
                            .input('UAEEXT', sql.Char(1), appUser.UAEEXT)
                            .input('OrangeCNO', sql.Char(10), appUser.OrangeCNO)

                            .input('STFEXS', sql.Numeric(18,3), appUser.STFEXS)
                            .input('TOTEXS1', sql.Numeric(18,3), appUser.TOTEXS1)
                            .input('TOTEXS2', sql.Numeric(18,3), appUser.TOTEXS2)
                            .input('VEH_VAL', sql.Numeric(18,3), appUser.VEH_VAL)
                            .input('ODPREM', sql.Numeric(18,3), appUser.ODPREM)
                            .input('TPPREM', sql.Numeric(18,3), appUser.TPPREM)
                            .input('RATEPREM', sql.Numeric(18,3), appUser.RATEPREM)
                            .input('TOOLPRM', sql.Numeric(18,3), appUser.TOOLPRM)
                            .input('ADLPAS', sql.Numeric(18,3), appUser.ADLPAS)
                            .input('LOADAMT', sql.Numeric(18,3), appUser.LOADAMT)


                            .input('UAEPRM', sql.Numeric(18,3), appUser.UAEPRM)
                            .input('POLFEES', sql.Numeric(18,3), appUser.POLFEES)
                            .input('MEDFEES', sql.Numeric(18,3), appUser.MEDFEES)
                            .input('OrangeCfees', sql.Numeric(18,3), appUser.OrangeCfees)
                            .input('TOTPREM', sql.Numeric(18,3), appUser.TOTPREM)
                            .input('GROSSPREM', sql.Numeric(18,3), appUser.GROSSPREM)
                            .input('GovtTax', sql.Numeric(18,3), appUser.GovtTax)
                            .input('Injfund_Tax', sql.Numeric(18,3), appUser.Injfund_Tax)
                            .input('NETPREM', sql.Numeric(18,3), appUser.NETPREM)
                            .input('IsCustTransfer', sql.Int, appUser.IsCustTransfer)

                            .input('IsRejected', sql.Int, appUser.IsRejected)
                            .input('TRTPRM', sql.Numeric(18,3), appUser.TRTPRM)
                            .input('AddlBenefits', sql.Numeric(18,3), appUser.AddlBenefits)
                            .input('IsVehRate', sql.Int, appUser.IsVehRate)
                            .input('IsSARate', sql.Int, appUser.IsSARate)
                            .input('IsSplAproval', sql.Int, appUser.IsSplAproval)
                            .input('c_rate', sql.Float, appUser.c_rate)
                            .input('FirstREG_DT', sql.DateTime, appUser.FirstREG_DT)
                            .input('IsFirstReg', sql.Int, appUser.IsFirstReg)
                            .input('IsExportVehicle', sql.Int, appUser.IsExportVehicle)
                            .input('GroupCode', sql.VarChar(15), appUser.GroupCode)
                            .input('tariffid', sql.Int, appUser.tariffid)
                            .input('IsBreakIn', sql.Int, appUser.IsBreakIn)
                            .input('off_details', sql.VarChar(50), appUser.off_details)
                            .input('off_Points', sql.Int, appUser.off_Points)
                            .input('vat', sql.Numeric(18,3), appUser.vat)
                            .input('vatper', sql.Numeric(18,3), appUser.vatper)
                            .input('ERA', sql.Char(1), appUser.ERA)
                            .input('eraamt', sql.Numeric(18,3), appUser.eraamt)
                            .input('eracardno', sql.Char(10), appUser.eracardno)
                            
                            .query(sqlQueries.createVehicleQuote);   
                            
                           
        return insertAppUser.recordset;
    } catch (error) {
        console.log('error is',error);
        return error.message;
    }
}

const creatMapCustID = async (appUser) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertAppUser = await pool.request()
                            .input('custID', sql.Int, appUser.custID)
                            .input('quoteID', sql.Int, appUser.quoteID)
                            .input('quoteNo', sql.VarChar(50), appUser.quoteNo)
                            
                            .query(sqlQueries.mapquotecust);   
                            
                           

        return insertAppUser.recordset;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const getcustQuoteList = async (appUser) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertAppUser = await pool.request()
                            .input('appUserID', sql.Int, appUser.appUserID)
                            .query(sqlQueries.getUserQuoteDetails);   
        return insertAppUser.recordset;
    } catch (error) {
        console.log(error);
        return error.message;
    }
} 

const insDrivelistquote = async (appUser) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertAppUser = await pool.request()
                            .input('QUOTE_Refno', sql.VarChar(14), appUser.QUOTE_Refno)
                            .input('pol_no', sql.Char(14), appUser.pol_no)
                            .input('dname', sql.VarChar(60), appUser.dname)
                            .input('dage', sql.Char(3), appUser.dage)
                            .input('dsex', sql.Char(1), appUser.dsex)
                            .input('drelation', sql.VarChar(60), appUser.drelation)
                            .input('did', sql.VarChar(30), appUser.did)
                            .input('USR_ID', sql.VarChar(15), appUser.USR_ID)
                            .input('IsCancelled', sql.Int, appUser.IsCancelled)
                            .input('dDOB', sql.DateTime, appUser.dDOB)
                            .query(sqlQueries.addDrivelistquote);   
        return insertAppUser.recordset;
    } catch (error) {
        console.log(error);
        return error.message;
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
    getVehicleType,
    creatVehiclePost,
    creatMapCustID,
    getcustQuoteList,
    insDrivelistquote
}