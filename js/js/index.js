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
		url: './json/product.json',
		type: 'get',
		dataType: 'json'
	})
	.done(function(data) {
		var cake = [];
		for(var i in data){
			if(cake.length==4){
				break;
			}
			if(data[i].type=='cake'){
				cake.push(data[i]);
			}
		}
		var str = '';
		for(var i in cake){
			str+=`<li data-id="${cake[i].id}">
		<img src="${cake[i].listimg}" data-id="${cake[i].id}"/>
		<p>
			<span data-id="${cake[i].id}">${cake[i].title}</span>
			<span data-id="${cake[i].id}">-${cake[i].etitle}-</span>
		</p>
	</li>`;
		}
		$('#fourproduct>ul').html(str);
		
		$('#fourproduct li').click(function(){
			location.href = '../../html/detail.html?'+$(this).attr('data-id');
		})
	})
})