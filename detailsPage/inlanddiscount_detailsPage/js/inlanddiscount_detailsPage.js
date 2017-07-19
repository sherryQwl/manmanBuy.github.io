$(function () {
    var urlData = getUrlData();
    console.log(urlData);
    //  当传入的是productId属性的时候, 调用下面的API,(form 海淘折扣)
    
    if (urlData.productId) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getmoneyctrlproduct",
            data: {
                productid: urlData['productId']
            },
            success: function (data) {
                console.log(data);
                var result1 = template("content-modal", data.result[0]);
                $(".product-info").append(result1);
                $(".product-info .content p").html(data.result[0].productInfo2);
                var result2 = template("location-modal", data.result[0]);
                $(".currentPage").append(result2);
                // 修改顶部左箭头的跳转路径
                $("header .header-top a").attr("href", "./../../haitao.html");
                $("header .header-top h2").html("海淘折扣");
                $(".currentPage p a:nth-of-type(2)").html("海淘折扣").attr("href", "./../../haitao.html");

                console.log(data.result[0].productInfo2)
                var swiper = new Swiper('.scroll-container', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true,
                    roundLengths: true, //防止文字模糊\
                    mode: 'horizontal',
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    // height: "auto"
                    // autoHeight: true,
                });
                // 回到顶部
                $("footer > .footer-links a:eq(2)").on("click", function () {
                    swiper.slideTo(0, 500, true);
                });
            }
        });
    } else if (urlData.index) {
        // form 首页
        $.ajax({
            url: "http://139.199.192.48:9090/api/getmoneyctrl",
            success: function (data) {
                console.log(data);
                var result = template("content-modal", data.result[urlData.index]);
                $(".product-info").append(result);
                var result2 = template("location-modal", data.result[urlData.index]);
                $(".currentPage").append(result2);

                // 修改顶部左箭头的跳转路径
                $("header .header-top a").attr("href", "./../../index.html");
                $("header .header-top h2").html("国内折扣");
                $(".currentPage p a:nth-of-type(2)").html("").next().remove();

                var swiper = new Swiper('.scroll-container', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true,
                    roundLengths: true, //防止文字模糊\
                    mode: 'horizontal',
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    // height: "auto"
                    // autoHeight: true,
                });
                // 回到顶部
                $("footer > .footer-links a:eq(2)").on("click", function () {
                    swiper.slideTo(0, 500, true);
                });
            }
        });
    } else if (urlData.kwkey) {
        // 来自于国内折扣
        $.ajax({
            url: "http://139.199.192.48:9090/api/getdiscountproduct",
            data: {
                productid: urlData["kwkey"]
            },
            success: function (data) {
                console.log(data);
                var result1 = template("content-modal", data.result[0]);
                $(".product-info").append(result1);
                $(".product-info .content").html("");
                $(".product-info .content").append("<p></p>");
                $(".product-info .content p").html(data.result[0].productInfo);
                $(".product-info .content p").before(data.result[0].productImg)
                var result2 = template("location-modal", data.result[0]);
                $(".currentPage").append(result2);

                // 修改顶部左箭头的跳转路径
                $("header .header-top a").attr("href", "./../../inlanddiscount.html");
                $("header .header-top h2").html("国内折扣");
                $(".currentPage p a:nth-of-type(2)").html("国内折扣").attr("href", "./../../inlanddiscount.html");


                console.log(data.result[0].productInfo2)
                var swiper = new Swiper('.scroll-container', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true,
                    roundLengths: true, //防止文字模糊\
                    mode: 'horizontal',
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    // height: "auto"
                    // autoHeight: true,
                });
                // 回到顶部
                $("footer > .footer-links a:eq(2)").on("click", function () {
                    swiper.slideTo(0, 500, true);
                });
            }
        });
    } else if (urlData.moneyctrl) {
        // 来自于省钱控
        console.log(111);
        $.ajax({
            url: "http://139.199.192.48:9090/api/getmoneyctrlproduct",
            data: {
                productid: urlData['moneyctrl']
            },
            success: function (data) {
                console.log(data);
                var result1 = template("content-modal", data.result[0]);
                $(".product-info").append(result1);
                $(".product-info .content p").html(data.result[0].productInfo2);
                var result2 = template("location-modal", data.result[0]);
                $(".currentPage").append(result2);
                // 修改顶部左箭头的跳转路径
                $("header .header-top a").attr("href", "./../../moneyctrl.html");
                $("header .header-top h2").html("省钱控");
                $(".currentPage p a:nth-of-type(2)").html("省钱控").attr("href", "./../../moneyctrl.html");

                console.log(data.result[0].productInfo2)
                var swiper = new Swiper('.scroll-container', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true,
                    roundLengths: true, //防止文字模糊\
                    mode: 'horizontal',
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    // height: "auto"
                    // autoHeight: true,
                });
                // 回到顶部
                $("footer > .footer-links a:eq(2)").on("click", function () {
                    swiper.slideTo(0, 500, true);
                });
            }
        });
    }

});