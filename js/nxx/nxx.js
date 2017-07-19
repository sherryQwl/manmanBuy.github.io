$(function () {
    var swiper;    
    $.ajax({
        url: "http://139.199.192.48:9090/api/getproductlist",
        data: {
            categoryid: 0,
            pageid: 1,
        },
        success: function (data) {
            console.log(data);


            var result = template("template", data);
            result = result.replace(/&#60;/g, "<");
            result = result.replace(/&#62;/g, ">");
            result = result.replace(/&#34;/g, "'");
            // console.log(result);
            $('.items').append(result);
            swiper = new Swiper('.scroll-container', {
                scrollbar: '.scroll-bar',
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊\
                mode: 'horizontal',
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            });
            $("footer > .footer-links a:eq(2)").on("click", function () {
                swiper.slideTo(0, 500, true);
            });


        }
    })
    // "pagesize": "每页大小",
    // "totalCount": "总条数"
    var currentPageNum = 1;
    getData(currentPageNum);


    $('.Next').click(function () {

        if ($(this).hasClass("disabled")) {
            alert("最后一页啦 别翻啦");
            return;
        }

        currentPageNum++;
        getData(currentPageNum);
        swiper.slideTo(0, 0, true);


    })

    $('.Previous').click(function () {

        if ($(this).hasClass("disabled")) {
            alert("第一页啦 别翻啦");
            return;
        }

        currentPageNum--;
        getData(currentPageNum);
        swiper.slideTo(0, 0, true);


    })


    function getData(mypageNum) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getproductlist",
            data: {
                categoryid: 0,
                pageid: mypageNum,
            },
            success: function (data) {
                // console.log(data.pagesize);
                // console.log(data.totalCount);
                var totalPage = Math.ceil(data.totalCount / data.pagesize);
                console.log(totalPage);
                $('.dropdown-toggle span:eq(2)').html(totalPage);
                $('.dropdown-toggle span:eq(0)').html(mypageNum);

                if (mypageNum == totalPage) {

                    $('.Next').addClass('disabled');

                } else {
                    $('.Next').removeClass('disabled');
                }
                if (mypageNum == 1) {

                    $('.Previous').addClass('disabled');

                } else {
                    $('.Previous').removeClass('disabled');
                }
                var result = template("template", data);
                result = result.replace(/&#60;/g, "<");
                result = result.replace(/&#62;/g, ">");
                result = result.replace(/&#34;/g, "'");

                $('.items').html(result);


                swiper = new Swiper('.scroll-container', {
                    scrollbar: '.scroll-bar',
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    freeMode: true,
                    roundLengths: true, //防止文字模糊\
                    mode: 'horizontal',
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true //修改swiper的父元素时，自动初始化swiper
                });
                $("footer > .footer-links a:eq(2)").on("click", function () {
                    swiper.slideTo(0, 500, true);
                });
            }
        })
    }



})

// "pagesize": "每页大小",
// "totalCount": "总条数"