define(['jquery','cookie'],function(){
	function init(){
		$(function(){
			var strjson = $.cookie('init');
			var json = [];
			if(strjson==undefined){
				strjson = '';
			}else{
				json = JSON.parse(strjson)
				//console.log(json)
			}
			var strid = location.href.split('?');
			if(strid.length==2){
				var id = strid[1];
				var arr = [];
				$.ajax({
					type:"get",
					url:"../../json/product.json",
					dataType:'json',
					success:function(data){
						for(var i in data){
							if(data[i].id==id){
								arr = data[i];
							}
						}
						var str = '';
						var play = ''
						for(var i in arr.showimgs){
							if(i==0){
								str+=`<li class="first"><img src="${arr.showimgs[i]}"></li>`;
							}else{
								str+=`<li><img src="${arr.showimgs[i]}"></li>`;
							}
							play+=`<li><img src="${arr.showimgs[i]}"></li>`;
						}
	//					//外接第一张大图
	//					play+=`<li><img src="${arr.showimgs[0]}"></li>`;
						//拼接小图
						$('.imglist>ul').html(str);
						//拼接无缝轮播
						$('.show>ul').html(play);
						var strhide = `<img src="${arr.showimgs[0]}">`;
						//拼接隐藏大图
						$('.hideimg').html(strhide)
						var strinfo = ` <h3 class="title">${arr.title}<span>${arr.etitle}</span></h3>
										<h3 class="cakeprice">￥${arr.price}</h3><span class="fontsize">尺寸：</span><div class="sizebox">`;
						for(var i in arr.size){
							strinfo+=`<div class="contain size"><i class="normal">${arr.size[i]}</i><em class="check"></em></div>`;
						}
						strinfo+=`</div><br />`;   
						if(arr.taste.length!=0){
							strinfo+= `<span>口味：</span>`;
						}
						for(var i in arr.taste){
							strinfo+=`<div class="contain taste"><i class="normal">${arr.taste[i]}</i><em class="check"></em></div>`;
						}
						strinfo+=`  <p class="time">需提前四小时预定</p>
									<p class="notie">${arr.notie}</p>
									<p class="choose">已选规格：<span class="cs"></span>&nbsp;<span class="ct"></span></p>
									<div class="num">
										<b>数量</b>
										<i class="numdown">-</i>
										<span class="count">1</span>
										<i class="numup">+</i>
										<a>加入购物车</a>
										<a>立即购买</a>
									</div>
									<p class="appnotie">订购中遇到问题请您查看订购流程或致电客服热线：4000 - 233 - 234</p>
									<div class="icon">
										<a class="wx"></a>
										<a class="kj"></a>
										<a class="wb"></a>
										<a class="rr"></a>
										<a class="txwb"></a>
										<a class="more"></a>
										<a class="sharecount">0</a>
									</div>`;
						$('.info').html(strinfo);
						
						if(arr.taste.length==0){
							$('.ct').remove();
						}
						
						var strarticle = '';
						for(var i in arr.introduce){
							strarticle +=`<p>${arr.introduce[i]}</p>`;
						}
						$('.article').html(strarticle);
						var strintroImg = ''
						if(arr.introimg!=''){
							strintroImg = ` <h6>夹层示意图</h6>
											<img src="${arr.introimg}">`;
						}
						$('.introImg').html(strintroImg);
						
						//选择尺寸
						$('.size').click(function(){
							if($(this).find('.check').css('display')==='none'){
								$('.size>.check').css('display','none');
								$(this).find('.check').css('display','inline-block');
								$('.choose>.cs').text($(this).find('.normal').text());
								$('.choose').css('display','block');
								if($('.choose>.ct').text()!==''){
									$('.notie').css('display','block')
								}
							}else{
								$('.size>.check').css('display','none');
								$('.choose>.cs').text('');
								if($('.choose>.ct').text()===''){
									$('.choose').css('display','none')
								}
								$('.notie').css('display','none')
							}
							
						})
						//选择口味
						$('.taste').click(function(){
							if($(this).find('.check').css('display')==='none'){
								$('.taste>.check').css('display','none');
								$(this).find('.check').css('display','inline-block');
								$('.choose>.ct').text($(this).find('.normal').text());
								$('.choose').css('display','block');
								if($('.choose>.cs').text()!==''){
									$('.notie').css('display','block')
								}
							}else{
								$('.taste>.check').css('display','none');
								$('.choose>.ct').text('');
								if($('.choose>.cs').text()===''){
									$('.choose').css('display','none')
								}
								$('.notie').css('display','none')
							}
						})
						var width = $('.show>ul:first').width()
						var n = $('.show>ul>li').length;
						var lenght = n*width;
						$('.show>ul').css('width',lenght);
						
						//小图点击事件
						$('.imglist>ul>li').click(function(){
							$('.imglist>ul>li').removeClass();
							$(this).addClass('first');
							$('.hideimg>img').attr('src',$(this).find('img').attr('src'));
							$('.show>ul').animate(
								{
									'left':-width*$(this).index()
								},300)
						})
						
						//放大镜
						var showImgWidth = $('.show').width();
						var hideImgWidth ;
						//鼠标移入显示大图
						$('.show').mouseover(function(){
							$('.hideimg').css('display','block');
							hideImgWidth = $('.hideimg>img').width();
						})
						//鼠标移出
						$('.hideimg').mouseout(function(){
							$(this).css('display','none')
						})
						//鼠标移动放大
						$('.hideimg').mousemove(function(e){
							var x = e.pageX - $(this).offset().left ;
							var y = e.pageY - $(this).offset().top;
							$(this).find('img').css({
								'left':-(hideImgWidth-showImgWidth)/showImgWidth*x,
								'top':-(hideImgWidth-showImgWidth)/showImgWidth*y
							})
							
						})
						var top = $(window).scrollTop();
						var t = parseInt($('#layer').height()/2)+top;
						$('#layer').css('top', t);
						$('#addsuccess').css('top', t);
						//滚动条
						$(window).scroll(function(e){
							if($('#muhu').css('display')==='block'){
								$('#muhu').css('height',$(document).height());
								var top = $(window).scrollTop();
								var t = parseInt($('#layer').height()/2)+top;
								$('#layer').css('top', t);
								$('#addsuccess').css('top', t);
							}
						})
						//数量加减
						$('.numdown').click(function(){
							if($('.count').html()>=2){
								var count = Number($('.count').html())
								$('.count').html(--count)
							}
						})
						$('.numup').click(function(){
							var count = Number($('.count').html())
							$('.count').html(++count)
						})
						
						//加入购物车
						$('.num>a').click(function(){
							if(($('.ct').html()!=''&&$('.cs').html()!='')||($('.cs').html()!=''&& $('.ct')==undefined)){
								var arr = {};
								arr.num = Number($('.count').html());
								arr.id = id;
								arr.size = $('.cs').html();
								arr.taste = $('.ct').html();
								console.log(json.length)
								if(json.length==0){
									strjson = '['+JSON.stringify(arr)+']';
									json = JSON.parse(strjson);
									$.cookie("init",strjson,{path:'/',expires:7});
								}else{
									var flag = false;
									for(var i in json){
										if(json[i].id==arr.id&&json[i].size==arr.size&&json[i].taste==arr.taste){
											json[i].num = Number(json[i].num)+Number(arr.num);
											flag = true;
											break;
										}
									}
									if(!flag){
										json.push(arr);
									}
									$.cookie("init",JSON.stringify(json),{path:'/',expires:7});
								}
								if($(this).html()=='立即购买'){
									location.href = '../../html/car.html';
								}else{
									$('#muhu').css('display','block');
									$('#addsuccess').css('display','block');
								}
							}else{
								$('#muhu').css('display','block');
								$('#layer').css('display','block');
							}
						})
						//关掉蒙版
						$('#btn').click(function(){
							$('#muhu').css('display','none');
							$('#layer').css('display','none');
						})
						$('#con').click(function(){
							$('#muhu').css('display','none');
							$('#addsuccess').css('display','none');
						})
						$('#tocar').click(function(){
							$('#muhu').css('display','none');
							$('#addsuccess').css('display','none');
							location.href = '../../html/car.html';
						})
					}
				});
			}
			
		})
	}
	return {
		init:init
	}
})