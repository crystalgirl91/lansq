angular.module('module.directive',[])
.directive('scrollSmoothed',['$document',function($document){
	return {
		restrict:"AE",
		link:function(scope,element,attrs){
			$document.on('scroll',function(e){
				var top = $document[0].body.scrollTop;
				var hei = element[0].querySelector('.header_top').clientHeight - element[0].querySelector('#stuck_container').clientHeight;
				if(top - hei > 0){
					element.addClass('fixer');
				}else{
					element.removeClass('fixer');
				}
			});
			$($document).on('click','.navigation li',function(e){
				$('.navigation li').removeClass('current');
				$(this).addClass('current');
			})
		}
	}
}])
.directive('pagination',[function(){
	return {
		restrict:'AE',
		replace:true,
		scope:{
			curIdx:"@",
			allLen:"@",
			maxNum:"@",
			changePageCallback:"&"
		},
		templateUrl:"public/template/common/pagination.html",
		link:function(scope,element,attrs){
			var cur = intNumber(scope.curIdx) || 1;
			var len = intNumber(scope.allLen);
			var num = intNumber(scope.maxNum) > 5 ? intNumber(scope.maxNum) : 10;
			var style = attrs.style;
			var styles = ['center','left','right'];

			styles.indexOf(style)>=0 && element.addClass('pagination-' + style);

			scope.pages = [];
			function intNumber(x){
				try{
					return Math.floor(Number(x));
				}catch(err){
					return  0;
				}
			}
			function getFullPages(){
				var len = scope.allLen;
				var arr = [];
				for(var i = 0 ; i < len; i++){
					arr.push(i + 1);
				}
				return arr;
			}
			
			function getPages(){
				var arr = [];
				var half = Math.ceil(num/2);
				var begin = cur - Math.ceil(num/2) > 0 ? cur - Math.ceil(num/2) + 1 : 1;
				// 获取长度为num的数组，begin,end分别为数组起始
				if(begin + num -1 > len){
					end = len;
					begin = len - num + 1;
				}else{
					end = begin + num - 1;
				}
				for (var i = begin; i <= end; i++) {
					arr.push(i);
				};
				// 将数组的超出部分用“...”替换
				if(begin > 1){
					arr.splice(0,2,1,'...');
				}
				if(end < len){
					arr.splice(num - 2,2,'...',len);
				}
				return arr;
			}
			function renderPage(){
				if(len < num){
					if(scope.pages){
						return;
					}
					scope.pages = getFullPages();
				}else{

					scope.pages = getPages();
				}
			}
			scope.chagePageIdx = function(idx){
				if(intNumber(idx)){
					cur = scope.curIdx = intNumber(idx);
					renderPage();
				}
			}
			scope.goToBegin = function(){
				scope.chagePageIdx(1);
			};
			scope.goToEnd = function(){
				scope.chagePageIdx(len);
			};
			scope.goToNext = function(){
				scope.chagePageIdx(cur + 1);
			};
			scope.goToPrev = function(){
				scope.chagePageIdx(cur - 1);
			};
			renderPage();
		},
	}
}])