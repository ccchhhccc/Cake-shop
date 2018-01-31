module.exports.listen = function(app,conn){
    var smsClient = require('./message.js');
    app.post('/sendMessage',(req,response)=>{
        var num = GetRandomNum(5);
        //发送短信
        smsClient.sendSMS({
            PhoneNumbers: req.body.phone,
            SignName: '陈海超',
            TemplateCode: 'SMS_122281214',
            TemplateParam: `{"code":"${num}"}`
        }).then(function (res) {
            let {Code}=res
            if (Code === 'OK') {
                //处理返回参数
                conn.query(`insert into code values('${req.body.phone}','${num}')`,function(err,result){
                    if(err){
                        return
                    }else{
                        response.send('success')
                    }
                })
               
            }
        }, function (err) {
            console.log(err)
        })
    })

    app.post('/validate',function(req,res){
        var sql = `select * from code where phone = '${req.body.phone}'`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    if(req.body.code==result[0].code){
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

    app.post('/register',function(req,res){
        var sql = `select * from code where phone = '${req.body.phone}'`;
        conn.query(sql,function(err,result){
            if(err){
                res.send('err')
            }else{
                if(result.length!=0){
                    if(req.body.code==result[0].code){
                        conn.query(`insert into user values('${req.body.phone}','${req.body.password}')`,function(err,result){
                            if(err){
                                return
                            }else{
                                res.send('success')
                            }
                        })
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

function GetRandomNum(n){
    var num = '';
    for(var i = 0 ; i<n ; i++){
        num += parseInt(Math.random()*10) ;
    }
    return num ;
}