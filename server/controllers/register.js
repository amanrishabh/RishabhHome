var connection = require('../config/config');
module.exports.registerUser = function(req, res) {
    var users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "phone_number": req.body.phonenumber,
    }
    connection.query('INSERT INTO user SET ?', users, function(error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query',
                error:error
            })
        } else {
            res.json({
                status: true,
                data: results,
                fields: fields,
                message: 'User  Registered Successfully'
            })
        }
    });
}

