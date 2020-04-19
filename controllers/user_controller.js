var express = require('express');
var router = express.Router();
var dbPool = require('../config/queries')
var logger = require('../config/winston');
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/test', function (req, res) {
    return res.status(500).json({
        success: true,
        message: 'successfully test'
    });

})

router.post('/register' , function (req, res) {
     try{
        //  let userquery = `INSERT INTO users.userdata (firstname, lastname, bio, phone, branch, email)
        //     VALUES('riyansh', 'koli', 'cute', '9205376405', 'cs', 'riyanshappu@gmail.com') `;
            let userquery = `INSERT INTO users.userdata (firstname, lastname, bio, phone, branch, email)
            VALUES('${req.body.firstname}', '${req.body.lastname}', '${req.body.bio}', '${req.body.phone}',
             '${req.body.branch}', '${req.body.email}') `;

            dbPool.query(userquery, function (err, result, fields) {

                if (err) { throw new Error(err); }
                else {
                   logger.info(`get single user query response : ${JSON.stringify(result)}`);
                    if (result.length == 0) {
                        return res.status(403).json({
                            message: 'data not added',
                            success: false
                        })
                    } else {
                        return res.status(200).json({
                            success: true,
                            user: result
                        });
                    }
                }
            });

     }catch(err){
        logger.info(`error occoured in get single user due to : ${error}`);
        res.status(404).json(error);
     }
});



router.get('/all', async function (req, res) {
    try {
        let getuserQuery = `SELECT * FROM users.userdata`;
        try {
            dbPool.query(getuserQuery, function (err, result, fields) {

                if (err) { throw new Error(err); }
                else {
                   logger.info(`get single user query response : ${JSON.stringify(result)}`);
                    if (result.length == 0) {
                        return res.status(403).json({
                            message: 'data not available',
                            success: false
                        })
                    } else {
                        return res.status(200).json({
                            success: true,
                            user: result
                        });
                    }
                }
            })
        } catch (err) {
            console.log("error in catch", err);
        }

    } catch (error) {
        logger.info(`error occoured in get single user due to : ${error}`);
        res.status(404).json(error);
    }
})

router.get('/getdata/:id' , async function(req, res,next){
    try {

        let getuserQuery = `SELECT * FROM users.userdata where user_id = '${req.params.id}'`;
        try {
            dbPool.query(getuserQuery, function (err, result, fields) {

                if (err) { throw new Error(err); }
                else {
                   logger.info(`get single user query response : ${JSON.stringify(result)}`);
                    if (result.length == 0) {
                        return res.status(403).json({
                            message: 'data not available',
                            success: false
                        })
                    } else {
                        return res.status(200).json({
                            success: true,
                            user: result
                        });
                    }
                }
            })
        } catch (err) {
            console.log("error in catch", err);
        }

    } catch (error) {
        logger.info(`error occoured in get single user due to : ${error}`);
        res.status(404).json(error);
    }
})


router.put('/edit', async function(req, res,next){
     var em = 'ramu@gmail.com';
     var bio = 'sab khatm aaj se abhi se';
   //  let addtypequery = await runQuery(`UPDATE "user" SET type='${req.body.type}' WHERE user_id = '${req.decoded.userId}'`);

     try{
          dbPool.query(`UPDATE users.userdata SET bio = '${bio}' WHERE email = '${em}'`, function(err, result,fields){
           
            if (err) { throw new Error(err); }
            else {
               logger.info(`get single user query response : ${JSON.stringify(result)}`);
                if (result.length == 0) {
                    return res.status(403).json({
                        message: 'data not available',
                        success: false
                    })
                } else {
                    return res.status(200).json({
                        success: true,
                        user: result
                    });
                }
            }
          })
     }catch(err){
         logger.info(`error occoured in get single user due to : ${err}`);
     }
})

router.delete('/delete', async function(req, res){
    let getuserQuery = `DELETE from users.userdata where user_id = 7`;
    try{
         dbPool.query(getuserQuery, function(err,result,fields){
            if (err) { throw new Error(err); }
            else {
               logger.info(`get single user query response : ${JSON.stringify(result)}`);
                if (result.length == 0) {
                    return res.status(403).json({
                        message: 'data not available',
                        success: false
                    })
                } else {
                    return res.status(200).json({
                        success: true,
                        user: result
                    });
                }
            }
         })
    }catch(err){
        logger.info(`error occoured in get single user due to : ${err}`);

    }
})
// function runQuery(query) {
//     return new Promise(function (resolve, reject) {
//         dbPool.query(query).then(
//             (version) => resolve(version)
//         ).catch((err) => {
//             var failMessage = ""
//             if (err.message != undefined) {
//                 failMessage = err.message;
//             } else {
//                 failMessage = JSON.stringify(err)
//             }
//             logger.error('Error occured in api');
//             reject(err)
//         })
//     })
// }

// async function runQuery(query) {
//     return new Promise( function (resolve, reject) {

//     })

//    dbPool.getConnection( async function(err,connection){
//         if (err) {
//           connection.release();
//           throw err;
//         }else{
//          console.log("mysql connected");
//          connection.query(query,function(err,rows){
//             if(!err) {
//                 console.log("queryrespones", rows);
//                 return rows;
//             } 
//         });
//         }   
//         connection.on('error', function(err) {      
//               throw err;
//         });
//     });
//}

module.exports = router;
