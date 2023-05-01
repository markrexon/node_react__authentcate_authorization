const jwt = require('jsonwebtoken');
const conn = require('../dataBaseConnection').promise();

exports.updateEmpById = async (req,res,next) => {
    const id=req.params.id;
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
        let emp=req.body; 
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const [row] = await conn.execute(
            "update employee set username=?,email=?,designation=?,status=? where id=?",
            [emp.username,emp.email,emp.designation,emp.status,id]
        );
            console.log(row);
            if (row.affectedRows > 0) {       
                     return res.status(200).json({
                        message: "Updated Successfully",
                    });
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}