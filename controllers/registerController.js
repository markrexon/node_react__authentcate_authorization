const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dataBaseConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `employee` WHERE `email`=?",
            [req.body.email],

          );
 
        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `employee`(`username`,`email`,`password`,`designation`) VALUES(?,?,?,?)',[
            req.body.username,
            req.body.email,
            hashPass,
            req.body.designation
        ]);
        console.log(res.body);
    //  const [role]=await conn.execute('insert into `role`(`emp_id`) VALUES(?)')
    
        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}