const express=require('express');
const router=express.Router();
const authController=require('../controllers/reportController');

router.get('/viewreport',authController.getReports);

module.exports=router;