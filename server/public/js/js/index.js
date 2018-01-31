$(function(){
	$('#top').load('./html/header.html',function(){
		$('#home').click(function(){
			location.href = './index.html';
		});
		$('#cake').click(function(){
			location.href = './html/cakelist.html';
		});
		$('#europecake').click(function(){
			location.href = './html/europecakelist.html';
		});
		$('#afternoontea').click(function(){
			location.href = './html/tealist.html';
		});
		$('#gift').click(function(){
			location.href = './html/giftlist.html';
		});
		$('#login').click(function(){
			location.href = './html/login.html';
		});
		$('#register').click(function(){
			location.href = './html/register.html';
		});
	});
	$('#bottom').load('./html/footer.html',function(){

	});
	new Swiper ('.swiper-container', {
		// 如果需要分页器
		pagination: '.swiper-pagination',
		paginationClickable :true,
		autoplayDisableOnInteraction:false,
		autoplay:2000,
		loop: true,
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'

	}) 
	
	$.ajax({
		url:'http://localhost:1234/getindex',
		type:'post',
		success:function(data){
			var html = '';
			for(var i = 0 ; i <4 ; i++){
				html += `<li data-id="${data[i].id}">
							<img src="${data[i].listimg}" />
							<p>
								<span>蛋糕</span>
								<span>-${data[i].type}-</span>
							</p>
						</li>`;
			}
			$('#fourproduct>ul').html(html);

			$('#fourproduct>ul>li').click(function(){
				console.log('html/detail.html?'+$(this).attr('data-id'))
				location.href = 'html/detail.html?'+$(this).attr('data-id');
			})
		}
	})
	
})