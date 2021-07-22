var connection = require('../config/config');
var jwt = require('jsonwebtoken');

module.exports.getSkill = function (req, res) {

  connection.query('SELECT * FROM skillset WHERE user_id = ?', [req.params.skill_id], (err, result) => {
      if (err) throw err;
      console.log(result)
      res.json({
        status: true,
        data: result,
        message: 'skillset'
      })
    
  })
}
module.exports.addskill = function (req, res) {
  var users = {
    "user_id": req.body.user_id,
    "primary_skill": req.body.primary_skill,
    "second_skill": req.body.second_skill,
    "experience": req.body.experience,
  }
  connection.query('INSERT INTO skillset SET ?', users, function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        fields: fields,
        message: 'User  Skill Registered  Successfully'
      })
    }
  });

}


module.exports.UpdateSkillData = function (req, res) {
  console.log("update")
  let skill_id = req.body.skill_id
  console.log(skill_id)

  var data = {
    "user_id": req.body.user_id,
    "primary_skill": req.body.primary_skill,
    "second_skill": req.body.second_skill,
    "experience": req.body.experience,
  }

  connection.query('UPDATE skillset SET ? WHERE skill_id = ?', [data, skill_id], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error:error
      })
    }
    else {
      console.log(results)
      var id = skill_id;
      console.log(id + 'id')
      connection.query('SELECT * FROM skillset WHERE skill_id = ?', [skill_id], function (error, results, fields) {

        res.json({
          status: true,
          data: results,
          message: 'Skillset Information  Update  Sucessfully'
        })
      })
    }
  })
}

module.exports.deleteSkillList = function (req, res) {
  connection.query('DELETE FROM skillset WHERE skill_id=?', [req.params.id], (err, rows, fields) => {
    if (!err) {
      console.log('deleted')
      res.json({
        status: true,
        message: 'user Skill deleted sucessfully'

      })
    } else {
      console.log(err)
    }
  });
}

