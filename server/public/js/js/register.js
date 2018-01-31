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
    
    $('.phoneNum').blur(function(){
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if(reg.test($(this).val())){
			$('#phoneErr').css({
				display:'none'
			})
		}else{
			$('#phoneErr').css({
				display:'inline-block'
			})
		}
	})
	
	$('.sendCode').click(function(){
		if($('#phoneErr').css('display')=='none' && $('.phoneNum').val()!=''&&$(this).html()=='发送验证码'){
			$(this).html('已发送');
			$.ajax({
				url:'http://localhost:1234/sendMessage',
				type:'post',
				data:{
					phone:$('.phoneNum').val()
				},
				success:function(data){
					console.log(data)
				}
			})
		}
		
	})

	$('.makepwd').blur(function(){
		if($('.pwd').val()!=''){
			if($(this).val()==$('.pwd').val()){
				$('#validatePwd').css({
					display:'none'
				})
			}else{
				$('#validatePwd').css({
					display:'inline-block'
				})
			}
		}else{
			$('#validatePwd').css({
				display:'none'
			})
		}
	})

	$('.checkbox').click(function(){
		$('.checkboxed').css({
			display:'block'
		})
	})

	$('.checkboxed').click(function(){
		$(this).css({
			display:'none'
		})
	})

	$('.btn').click(function(){
		if($('#phoneErr').css('display')=='none' &&$('#validatePwd').css('display')=='none' && $('.checkboxed').css('display')!='none' && $('.phoneNum').val()!='' &&$('.validataCode').val()!=''&&$('.pwd').val()!=''&&$('.makepwd').val()!=''){
			$.ajax({
				url:'http://localhost:1234/register',
				type:'post',
				data:{
					phone:$('.phoneNum').val(),
					password:$('.pwd').val(),
					code:$('.validataCode').val()
				},
				success:function(data){
					if(data=='err'){
						$('#vcode').css({
							display:'inline-block'
						})
					}else{
						location.href = '../../html/login.html'
					}
				}
			})
		}
	})
})