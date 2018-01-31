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
	$.ajax({
		type:"post",
		url:"http://localhost:1234/cakelist",
		dataType:'json',
		success:function(data){
			var str = '';
			for(var i in data){
				str += `<li data-id="${data[i].id}">
							<img src="../${data[i].listimg}" class="cakeimg"/>
							<p>
								<span class="title">${data[i].title}</span>
								<span class="e_title">${data[i].etitle}</span>
							</p>`;
			if(data[i].hot==='yes'){
				str+=`<i class="hot">热卖</i>`;
			}
			str+=`<a class="shoppingcar"></a>
					<em class="solid"></em>
				</li>`;
			}
			
			$('#all>ul').html(str);
			$('#all>ul>li').click(function(){
				location.href = '../../html/detail.html?'+$(this).attr('data-id');
			})
		}
	});
})
