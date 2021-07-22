const registercontrollerObj = require('../controllers/register');
const logincontrollerObj = require('../controllers/login');
const skillObj = require('../controllers/skillset');



const express = require('express')
const router =  express.Router();


/*--------------------------------------------dashboard api-----------------------*/
router.post('/api/login', logincontrollerObj.loginUser);
router.post('/api/register', registercontrollerObj.registerUser);

router.post('/api/add_skillset', skillObj.addskill);
router.get('/api/get_skillset/:skill_id', skillObj.getSkill);
router.put('/api/update_skillset', skillObj.UpdateSkillData);
router.delete('/api/delete_skillset/:id', skillObj.deleteSkillList);

module.exports = router;
