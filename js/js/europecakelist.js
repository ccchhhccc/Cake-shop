define(['jquery'],function(){
	function init(){
		
		$(function(){
			$.ajax({
				type:"get",
				url:"../../json/product.json",
				dataType:'json',
				success:function(data){
					var arr = []
					for(var i in data){
						if(data[i].type=='europe'){
							arr.push(data[i])
						}
					}
					var str = '';
					for(var i in arr){
						str += `<li data-id="${arr[i].id}">
									<img src="${arr[i].listimg}" class="cakeimg"/>
									<p>
										<span class="title">${arr[i].title}</span>
										<span class="e_title">${arr[i].etitle}</span>
									</p>`;
					if(arr[i].hot){
						str+=`<i class="hot">热卖</i>`;
					}
					str+=`<a class="shoppingcar"></a>
							<em class="solid"></em>
						</li>`;
					}
					
					$('#europecakelist>ul').html(str);
					$('#europecakelist>ul>li').click(function(){
						location.href = '../../html/detail.html?'+$(this).attr('data-id');
					})
				},
				error:function(){
					console.log(23)
				}
			});
		})
	}
	return{
		init:init
	}
})