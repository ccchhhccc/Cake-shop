define(['jquery','cookie'],function(){
	function init(){
		var json = [];
		$(function(){
			$.ajax({
				type:"get",
				url:"../../json/product.json",
				success:function(data){
					var strjson = $.cookie('init');
					if(strjson!=undefined){
						json = JSON.parse(strjson);
						console.log(json)
					}
					
					if(json.length!=0){
						var str = '';
						for(var i in json){
							for(var j in data){
								if(json[i].id==data[j].id){
									var sub = json[i].num*data[j].price;
									if(json[i].taste==undefined){
										var taste = '';
									}else{
										var taste = json[i].taste;
									}
									str+=`<div class="carlist">
											<img src="${data[j].listimg}" />
											<div class="produce">
												<p>${data[j].title}</p>
												<span>规格：<span class="carsize">${json[i].size}</span>&nbsp;<span class="cartaste">${taste}</span></span>
											</div>
											<em class="price"><em>${data[j].price}</em>元/个</em>
											<div class="change">
												<b data-index="${i}" class="cardown">-</b>
												<input type="text" value="${json[i].num}" class="produceNum"/>
												<b data-index="${i}" class="carup">+</b>
											</div>
											<span class="subPrice">${sub}元</span>
											<span class="del" data-index="${i}">删除</span>
										</div>`;
								}
							}
						}
						$('#carlist').html(str);
					}
					compute()
					//购物车减
					$('.cardown').click(function(){
						var num = Number($(this).next().val());
						if(num>=2){
							num--;
							json[$(this).attr('data-index')].num--;
						}
						$(this).next().val(num);
						var signprice = $(this).parent().prev().find('em').html();
						var subprice = num*signprice;
						$(this).parent().next().html(subprice+'元');
						compute()
					})
					//购物车加
					$('.carup').click(function(){
						var num = Number($(this).prev().val());
						$(this).prev().val(++num)
						json[$(this).attr('data-index')].num++;
						var signprice = $(this).parent().prev().find('em').html();
						var subprice = num*signprice;
						$(this).parent().next().html(subprice+'元');
						compute()
					})
					
					//购物车删除
					$('.del').click(function(){
						var delindex = $(this).attr('data-index');
						$(this).parent().remove();
						$('.carlist').each(function(){
							if($(this).index()>=delindex){
								var temp = $(this).find('.cardown').attr('data-index');
								$(this).find('.cardown').attr('data-index',temp-1);
								$(this).find('.carup').attr('data-index',temp-1);
								$(this).find('.del').attr('data-index',temp-1);
							}
						})
						json.splice(delindex,1);
						compute()
					})
					
					$('.goshopping').click(function(){
						location.href = '../../index1.html';
					})
				}
			});
		})
		//计算总价 && 存cookie  && 更改商品总数
		function compute(){
			var total = 0 ;
			$('.subPrice').each(function(){
				total += parseInt($(this).html());
			})
			$('.all>em').html(total)
			var len = json.length
			$('.totalNum').html('|&nbsp;共'+len+'件商品')
			$.cookie('init',JSON.stringify(json),{path:'/',expires:7})
		}
	}
	return {
		init:init
	}
})