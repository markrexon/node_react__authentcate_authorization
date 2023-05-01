const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dataBaseConnection').promise();


// exports.login = async (req,res,next) =>{
//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try{

//         const [row] = await conn.execute(
//             "SELECT * FROM `employee` WHERE `email`=?",
//             [req.body.email]
//           );

//         if (row.length === 0) {
//             return res.status(422).json({
//                 message: "Invalid email address",
//             });
//         }
// console.log(row);
//         const passMatch = await bcrypt.compare(req.body.password, row[0].password);
//         const [rows] = await conn.execute(
//             "SELECT role FROM `employee` WHERE `email`=?",
//             [req.body.email]

//           );
//         //   const [checking] = await conn.execute(
//         //     "SELECT status FROM `employee` WHERE `email`=?",
//         //     [req.body.email]

//         //   );
         
//           console.log(rows);
//         console.log(row[0].password);
//         console.log(req.body.password)
//         if(!passMatch){
//             return res.status(422).json({
//                 message: "Incorrect password",
//             });
//         }

       
//             const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
       
//         return 
        
//         res.json({
//             // role:rows,
//             token:theToken
//         });

//     }
//     catch(err){
//         next(err);
//     }
// }

exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
        const [row] = await conn.execute(
            "SELECT * FROM `employee` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }
  const [checking] = await conn.execute(
    "SELECT status FROM `employee` WHERE `email`=?",
   [req.body.email]

  );
  const [rows] = await conn.execute(
                "SELECT role FROM `employee` WHERE `email`=?",
                [req.body.email]
    
              );
        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }
     
        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return  (checking[0].status=='active') ? res.json({
            role:rows[0].role,
            token:theToken
        }):console.log(next(err));

    }
    catch(err){
        next(err);
    }
}