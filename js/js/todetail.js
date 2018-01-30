define(['jquery'],function(){
	function init(){
		
		$(function(){
			$('li').click(function(){
				console.log(233333)
				var id = $(this).attr('data-id');
				console.log(id)
				if(id!=''||id!=undefined){
					location.href = '../../html/datail.html?'+id;
				}
			})

		})
		console.log(233)
	}
	return {
		init:init
	}
})