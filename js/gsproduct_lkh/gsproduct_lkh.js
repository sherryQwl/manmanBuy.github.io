$(function () {
    var winwidth = $(window).width();




    var shopid;
    var areaid;
    //请求店铺信息并渲染到下拉列表
    getshoplist();
    // 请求区域以及价格信息渲染下拉列表
    getarealist();
    // 请求商品列表并渲染
    getprolist(0, 1);


    //改变店铺按钮组名字并出现对应商品
    $('.navbox').on('click', '.shop li a', function () {
        shopname = $(this).html();
        $('.shop .tit').html(shopname);

        shopid = $(this).attr('data-shopid');
        if (!areaid) {
            areaid = 0;
        }
        getprolist(shopid, areaid);
        // console.log('shopid:' + shopid + 'areaid:' + areaid);
    })
    //改变区域按钮组名字并出现对应商品
    $('.navbox').on('click', '.area li a', function () {
        var areaname = $(this).html().slice(0, 2);
        $('.area .tit').html(areaname);

        if (!shopid) {
            shopid = 0;
        }
        areaid = $(this).attr('data-areaid');
        getprolist(shopid, areaid);
        // console.log('shopid:' + shopid + 'areaid:' + areaid);
    })


    //------------封装-----------------------------------------------------------
    //方法-请求店铺信息并渲染到下拉列表
    function getshoplist() {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsshop',
            success: function (data) {
                // console.log(data.result);
                shopid = data.result.shopId;
                // console.log(shopid);
                var result = template('gspro-nav1', data);
                // console.log(result);
                $('.main-title').html(result);
                $('.dropdown-menu').width(winwidth);
            }
        })
    }
    // 方法-请求区域以及价格信息渲染下拉列表
    function getarealist() {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsshoparea',
            success: function (data1) {
                console.log(data1);
                var result1 = template('gspro-nav2', data1);
                $('.main-title').append(result1);
                $('.dropdown-menu').width(winwidth);
                $('.main-title .area li:last-child').remove();

                $(".navbox .area > ul").css({
                    left: -$(".navbox .area").offset().left - 2 + "px"
                });
            }
        })
    }
    // 请求商品列表并渲染
    function getprolist(shopid, areaid) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: areaid,
            },
            success: function (data3) {
                // console.log(data3);
                var result2 = template('cdp-list', data3);
                // console.log(result2);
                $('.cdp-list-ul').html(result2);
            }
        })
    }
})