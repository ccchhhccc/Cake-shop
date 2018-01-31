$(function(){
    $('#top').load('../html/header.html',function(){
		$('#home').click(function(){
			location.href = '../index.html';
		});
		$('#cake').click(function(){
			location.href = '../html/cakelist.html';
		});
		$('#europecake').click(function(){
			location.href = '../html/europecakelist.html';
		});
		$('#afternoontea').click(function(){
			location.href = '../html/tealist.html';
		});
		$('#gift').click(function(){
			location.href = '../html/giftlist.html';
		});
		$('#login').click(function(){
			location.href = '../html/login.html';
		});
		$('#register').click(function(){
			location.href = '../html/register.html';
		});
	});
	$('#bottom').load('../html/footer.html',function(){

    });

    $('.tologin').click(function(){
        if($('.phone').val()==''||$('.password').val()==''){
            $('#err').css({
                display:'block'
            }).html('请输入账号和密码')
        }else{
            $('#err').css({
                display:'none'
            }).html('账号或密码错误')

            $.ajax({
                url:'http://localhost:1234/login',
                type:'post',
                data:{
                    phone:$('.phone').val(),
                    password:$('.password').val()
                },
                success:function(data){
                   if(data=='err'){
                        $('#err').css({
                            display:'block'
                        })
                   }else if(data=='success'){
                        location.href = '../../index.html';
                   }
                }
            })
        }
    })

})