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
						if(data[i].type=='cake'){
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
					
					$('#all>ul').html(str);
					$('#all>ul>li').click(function(){
						location.href = '../../html/detail.html?'+$(this).attr('data-id');
					})
				}
			});
		})
	}
	return{
		init:init
	}
})