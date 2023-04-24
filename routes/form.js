const express=require('express');
const router=express.Router();
const authController=require('../controllers/formcontrol');

router.post('/addstudent',authController.addStudent);

module.exports=router;