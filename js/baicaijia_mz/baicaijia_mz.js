/*
* @Author: Marte
* @Date:   2017-07-04 08:25:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-04 08:27:21
*/

'use strict';
$(function () {
//	 1、页面入口
//	 点击首页的导航栏----白菜价图标跳转

    //设置领取优惠券进度条颜色宽度
    function getStep() {
        var step = $('.bar span').last().text();
        $('.bar span').css('width',step)
    }
//	 2、左侧滑动导航栏
//	 li标签的内容通过api后台获取标题列表
//	 点击对应的标题返回相应的商品列表
//	 输入：无
//	 输出：滑动导航栏标题和ID
//		默认显示全部标题下的内容
//		事件名 click
//		事件源 li标签下的a标签
//		事件处理程序
//		li标签添加类名ui-state-active显示红色下边框
//		ajax发送titleId,返回对应标题的商品详细信息并渲染
//----------------------------------------------------------------
    // 白菜价标题api
    $.ajax({
        url:'http://139.199.192.48:9090/api/getbaicaijiatitle',
        success: function (data) {
			//console.log(data);
            // 调用模板引擎
            var result = template('nav-list', data);
            $('.nav-list').html(result);
            var swiper = new Swiper('.bcj-head-cat', {
                direction: 'horizontal',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊\
                mode: 'horizontal',
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            });
            //添加自定义属性
            //console.log('获取的ID--'+$('.nav-list li').attr('titleId'));
            //添加点击红框类名
            $('.nav-list li').first().next().addClass('active');
            //左侧导航栏点击
            $('.nav-list li').click(function () {
                //添加红框样式名
                $('.nav-list li').removeClass('active');
                $(this).addClass('active');
                //获取相应ID的商品信息 重新添加
                $.ajax({
                    url:'http://139.199.192.48:9090/api/getbaicaijiaproduct',
                    data:{
                        titleid : $(this).attr('titleId'),
                    },
                    success: function (data) {
                        // 调用模板引擎
                        var result = template('bcj-list', data);
                        // console.log(result);
                        $('.bcj-list ul').html(result);
                        getStep();
                    }
                })
            })
        }
    })
    // 3、商品列表
    // 商品列表信息通过api后台获取
    // 输入：titleId
    // 输出：
    //	 3-1、优惠券信息
    //	 商品列表信息通过api后台获取
    //		$.ajax({
    //			url:'http://139.199.192.48:9090/api/getbaicaijiaproduct',
    //			data:{
    //				titleid : 1,
    //			},
    //			success: function (data) {
    //				//返回20条 商品信息
    //				var res = data.result;
    //				console.log(res[0]);
    //				console.log('点击领取***优惠券'+res[0].productCoupon);
    //				console.log('已领***数量'+res[0].productCouponRemain);
    //			}
    //		})
//------------------------------------------------------------
//		白菜价商品列表api  初始化 全部标签下的商品列表
    $.ajax({
        url:'http://139.199.192.48:9090/api/getbaicaijiaproduct',
        data:{
            titleid : 1,
        },
        beforeSend:function (){
            $('.Page_loading').css('display','block');
        },
        success: function (data) {
            $('.Page_loading').css('display','none');
            //返回20条 商品信息
//				console.log(data);
            // 调用模板引擎
            var result = template('bcj-list', data);
//                console.log(result);
            $('.bcj-list ul').append(result);
            getStep();
        }
    })

        // 4、返回顶部按钮
        // 页面滚动到隐藏第一个商品信息，显示且固定定位在右下角
		// 事件名 scroll
		// 事件源 window
		// 事件处理程序
		// 页面滚动到隐藏第一个商品信息高度
		// 操作对象:<a class='goTop'>
		// display:none ----->inline-block显示元素
    $(".goTop").click(function(){
        $('body,html').animate({scrollTop:0},800);
    })
        // 5、页面加载图标显示
        // 页面滚动到显示底部时，页面请求加载商品信息，在信息成功返回前显示
		// 事件名 scroll
		// 事件源 window
		// 事件处理程序
		// 页面滚动到显示底部时
		// 操作对象:<div class='Page_loading'>
		// display:none ----->block显示元素

    $(window).scroll(function(){
        var scrollTop = Math.ceil(document.body.scrollTop);//2728可变
        var offsetHeight = document.body.offsetHeight;//736
        var scrollHeight = document.body.scrollHeight;//3464
        //滚动到10% 出现回到顶部图标
        if(scrollTop / (scrollHeight - offsetHeight)>=0.12){
            $('.goTop').css('display','inline-block');
        }else{
            $('.goTop').css('display','none');
        }
//            if(scrollTop == (scrollHeight - offsetHeight)){
        if(scrollTop / (scrollHeight - offsetHeight)>=0.995){
            //判断触底执行
            console.log('end');
            $('.Page_loading').css('display','block');
            var activeId = $('.nav-list li[class*="active"]').attr('titleId');
            $.ajax({
                url:'http://139.199.192.48:9090/api/getbaicaijiaproduct',
                data:{
                    titleid : activeId,
                },
                success: function (data) {
                    $('.Page_loading').css('display','none');
                    // 调用模板引擎
                    var result = template('bcj-list', data);
                    $('.bcj-list ul').append(result);
                    getStep();
                }
            })

        }

    });

})