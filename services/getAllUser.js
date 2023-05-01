const jwt = require('jsonwebtoken');
const conn = require('../dataBaseConnection').promise();

exports.getAllUsers = async (req,res,next) => {

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
 
      
        const [row] = await conn.execute(
            "SELECT `username`,`email`,`designation`,`status` from `employee`",
        );
        const [rows] = await conn.execute(
            "SELECT * from `employee`",
        );
      

        let checkRole = rows.filter(function (el)
        {
          return  el.role!='admin'
      
        }
        );
        console.log(checkRole);
 
        if(row.length > 0){
            return  res.json({
                user:checkRole
            }) ;
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}