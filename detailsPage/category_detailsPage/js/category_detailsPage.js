$(function () {
    var urlData = getUrlData();
    console.log(urlData);
    var curProId;
    if (urlData.nxxkey) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getproduct",
            data: {
                productid: urlData["nxxkey"]
            },
            success: function (data) {
                console.log(data);
                var categoryId = data.result[0].categoryId;
                curProId = data.result[0].productId;
                console.log(curProId);
                var price = $(data.result[0].bjShop).find(".red").html();
                price = price.trim();
                var resultProInfo = template("productInfo-modal", data.result[0]);
                $("main").prepend(resultProInfo);
                $("main>.detail>.font2>.font_left>span:eq(1)").html(price);
                $("main .jd > a > span:eq(0)").html(price);
                var navTitle = template("navTitle-modal", data.result[0]);

                $(".nav").html(navTitle);

                $.ajax({
                    url: "http://139.199.192.48:9090/api/getcategorybyid",
                    data: {
                        categoryid: categoryId
                    },
                    success: function (data) {
                        console.log(data);
                        var currentClass = data.result[0].category;
                        $(".nav span:eq(2) a").html(currentClass);
                    }
                });
                $.ajax({
                    url: "http://139.199.192.48:9090/api/getproductcom",
                    data: {
                        productid: curProId
                    },
                    success: function (data) {
                        console.log(data)
                        var result = template("disguess-moadl", data);

                        $(".disguess").html(result);
                        var swiper = new Swiper('.scroll-container', {
                            scrollbar: '.scroll-bar',
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
                    }
                });
            }
        });

    }
})