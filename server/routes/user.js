module.exports.listen = function(app,conn){
    
    app.post('/login',function(req,res){
        conn.query(`select * from user where phonenum = '${req.body.phone}'`,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    if(result[0].password==req.body.password){
                        res.send('success')
                    }else{
                        res.send('err')
                    }
                }else{
                    res.send('err')
                }
                
            }
        })
    })
}