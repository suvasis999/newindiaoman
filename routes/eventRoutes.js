'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');
const router = express.Router();

router.get('/events', eventControll.getAllEvents);
router.get('/event/:id', eventControll.getEvent);
router.post('/event', eventControll.addEvent);
router.put('/event/:id', eventControll.updatEvent);
router.delete('/event/:id', eventControll.deleteEvent);

//Node JS API OMAN

router.get('/demoData', eventControll.getDemodata);
router.post('/appUser', eventControll.addAppuser);
router.post('/appUserLogin', eventControll.getUserLogin);
router.post('/appUserVerified', eventControll.getUserVerified);
router.get('/getVechleMake', eventControll.getVechleMake);
router.post('/getVechleModel', eventControll.getVechleModel);
router.get('/getVechleType', eventControll.getVechleType);
router.post('/postVehicleQuote', eventControll.postVehicleQuote);
module.exports = {
    routes: router
}