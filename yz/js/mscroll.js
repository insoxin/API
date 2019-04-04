/*  
  2019-01-02
  时间流逝
*/

// 最外层盒子
var combox = $('.container');
// 获取固定显示的盒子
var fixedbox = $('.fixedbox');
var obj = (function() {
	// 获取box的长度
	var boxlen = combox.find('.box');
	// 获取固定显示的title
	var fixedboxtitle = $('.fixedbox').find('.area_title');
	// picture_list 显示图片的盒子
	var picture_list = $('h2.picture_list');
	// area_img 显示上下箭头盒子
	var area_img = $('div.area_img');
	// area_title 每个层级的title
	area_title = $('span.area_title');
	// area_namber 每个层级的数量
	area_namber = $('span.area_namber');
	// 上下箭头的图片路径
	var imgsrc = ['img/top.png', 'img/bottom.png'];
	// 创建空数组，记录每个栏目距离顶部的距离
	var arrtop = [];
	// 计数器,当前滚动到第几个栏目;
	var cont = 0;
	// 设置栏目展开收起的速度,1000是1S
	var su = 500;
	// 设置固定标题栏默认显示的标题和数量
	fixedbox.find('.area_title').html(boxlen.eq(0).find('.area_title').html())
	fixedbox.find('.area_namber').html(boxlen.eq(0).find('.area_namber').html())
	return {
		// 获取每个盒子距离顶部的距离存放到数组里去
		boxheight: function() {
			arrtop = [];
			for (var i = 0; i < boxlen.length; i++) {
				arrtop.push(parseInt(boxlen.eq(i).offset().top));
			}
			return arrtop;
		},
		// 页面滚动
		isscroll: function() {
			obj.istitle();
		},
		// 点击展开收起
		istoge: function() {
			var m = $(this);
			// 判断当前状态是否展开
			if (m.siblings(picture_list.selector).is(':hidden')) {
				m.children(area_img.selector).children().attr('src', imgsrc[0]);
			} else {
				m.children(area_img.selector).children().attr('src', imgsrc[1]);
			}
			m.siblings(picture_list.selector).stop().slideToggle(su, function() {
				if (m.siblings(picture_list.selector).is(':hidden')) {
					m.children(area_img.selector).children().attr('src', imgsrc[1]);
				} else {
					m.children(area_img.selector).children().attr('src', imgsrc[0]);
				}
			});
		},
		// 点击第一个展开收起
		onetoge: function() {
			var m = $(this);
			// 获取当前点击的index值
			var thisidx = fixedboxtitle.attr('data-id') - 1;
			// 判断当前状态是否展开
			if (boxlen.eq(thisidx).find(picture_list.selector).is(':hidden')){
				// 点击固定滚动的栏目切换箭头图标
				m.find(area_img.selector).children().attr('src', imgsrc[0]);
				// 点击固定滚动的栏目，对应的box盒子切换箭头图标
				combox.children().eq(thisidx).find(area_img.selector).children().attr('src', imgsrc[0]);
			}else {
				// 点击固定滚动的栏目切换箭头图标
				m.find(area_img.selector).children().attr('src', imgsrc[1]);
				// 点击固定滚动的栏目，对应的box盒子切换箭头图标
				combox.children().eq(thisidx).find(area_img.selector).children().attr('src', imgsrc[1]);
			}
			boxlen.eq(thisidx).children(picture_list.selector).stop().slideToggle(su, function() {
				obj.istitle();
			});
		},
		// 滚动函数
		istitle: function() {
			// 滚动条滚动了多少
			var scrTop = $(document).scrollTop();
			// 获取数组,每个盒子距离顶部的距离
			var arr = obj.boxheight();
			// console.log(arr)
			for (var i = 1; i < arr.length; i++) {
				if (scrTop < arr[i + 1] && scrTop > arr[i]) {
					cont++;
					// 获取当前滚动到第几个栏目，将固定定位的栏目名称改成当前栏目名称
					fixedboxtitle.html(boxlen.eq(i).find(area_title.selector).html());
					fixedboxtitle.siblings(area_namber.selector).html(boxlen.eq(i).find(area_namber.selector).html())
					// 获取当前滚动到第几个栏目，将固定定位的栏目data-id改成当前栏目data-id
					fixedboxtitle.attr('data-id', boxlen.eq(i).find(area_title.selector).attr('data-id'));
				} else if (scrTop > arr[arr.length - 1]) {
					cont++;
					// 获取当前滚动到第几个栏目，将固定定位的栏目名称改成当前栏目名称
					fixedboxtitle.html(boxlen.eq(i).find(area_title.selector).html());
					fixedboxtitle.siblings(area_namber.selector).html(boxlen.eq(i).find(area_namber.selector).html())
					// 获取当前滚动到第几个栏目，将固定定位的栏目data-id改成当前栏目data-id
					fixedboxtitle.attr('data-id', boxlen.eq(i).find(area_title.selector).attr('data-id'));
				} else if (scrTop < arr[1]) {
					// 获取当前滚动到第几个栏目，将固定定位的栏目名称改成当前栏目名称
					fixedboxtitle.html(boxlen.eq(0).find(area_title.selector).html());
					fixedboxtitle.siblings(area_namber.selector).html(boxlen.eq(0).find(area_namber.selector).html())
					// 获取当前滚动到第几个栏目，将固定定位的栏目data-id改成当前栏目data-id
					fixedboxtitle.attr('data-id', boxlen.eq(0).find(area_title.selector).attr('data-id'));
				}
			}
			// 保存当前层数的data-id值
			var thisidx = fixedboxtitle.attr('data-id') - 1;
			// 判断当前状态是否展开
			if (boxlen.eq(thisidx).find(picture_list.selector).is(':hidden')) {
				fixedbox.find(area_img.selector).children().attr('src', imgsrc[1]);
			} else {
				fixedbox.find(area_img.selector).children().attr('src', imgsrc[0]);
			}
		}
	}
}())
// 获取每个盒子距离顶部的距离存放到数组里面去
obj.boxheight();
// 页面滚动
$(window).on('scroll', function() {
	obj.isscroll();
})
// 每个栏目点击展开收起
combox.on('click', '.box h4.area', function() {
	obj.istoge.apply($(this))
})
// 第一个栏目点击展开收起
fixedbox.on('click', function() {
	obj.onetoge.apply($(this));
})