var connection = require('../config/config');
var jwt = require('jsonwebtoken');
module.exports.loginUser = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM user WHERE email =  ?';
    connection.query(sql, [email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query',
                error:error
            })
        }
        else {
            if (results.length > 0) {
                if (password == results[0].password) {
                    var NewData = (results[0]);
                    const token = jwt.sign({
                        NewData,
                        expiresInMinutes: 1
                    },

                        'my_secret_key');

                    res.json({
                        status: true,
                        token: token,
                        data: NewData,
                        message: 'Successfully Authenticated'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email and password does not match"
                    });
                }
            }
            else {
                res.json({
                    status: false,
                    message: "Email does not exits"
                });
            }
        }
    })

}