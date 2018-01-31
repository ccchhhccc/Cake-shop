module.exports.listen = function(app,conn){
    app.post('/getindex',function(req,res){
        conn.query('select * from cake',function(err,result){
            if(err){
                return
            }else{
                res.send(result)
            }
        })
    })

    app.post('/getDetail',function(req,res){
        var obj = {};
        conn.query(`select * from cake where id = ${req.body.id}`,function(err,result){
            if(err){
                return
            }else{
               obj.info = result[0];
                conn.query(`select * from showimg where showimgsid = ${obj.info.showimgsid}`,function(err,result){
                    if(err){
                        return 
                    }else{
                        obj.showimgs = result;
                        conn.query(`select * from size where sizeid = ${obj.info.sizeid}`,function(err,result){
                            if(err){
                                return 
                            }else{
                                obj.size = result;
                                conn.query(`select * from taste where tasteid = ${obj.info.tasteid}`,function(err,result){
                                    if(err){
                                        return 
                                    }else{
                                       obj.taste = result;
                                       conn.query(`select * from introduce where introduceid = ${obj.info.introduceid}`,function(err,result){
                                            if(err){
                                                return 
                                            }else{
                                                obj.introduce = result;
                                                res.send(obj)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })

    app.post('/cakelist',function(req,res){
        conn.query(`select * from cake where type ='cake'`,function(err,result){
            if(err){
                return
            }else{
                res.send(result)
            }
        })
    })

    app.post('/europecake',function(req,res){
        conn.query(`select * from cake where type ='europe'`,function(err,result){
            if(err){
                return
            }else{
                res.send(result)
            }
        })
    })

    app.post('/gift',function(req,res){
        conn.query(`select * from cake where type ='gift'`,function(err,result){
            if(err){
                return
            }else{
                res.send(result)
            }
        })
    })

    app.post('/tea',function(req,res){
        conn.query(`select * from cake where type ='tea'`,function(err,result){
            if(err){
                return
            }else{
                res.send(result)
            }
        })
    })
}