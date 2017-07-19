$(function () {
    var swiper;
    var urlData = getUrlData();
    console.log(urlData);
    // $.ajax({
    //     url: "http://139.199.192.48:9090/api/getproductlist",
    //     data: {
    //         categoryid: urlData["categoryKey"],
    //         pageid: 1
    //     },
    //     success: function (data) {
    //         console.log(data);
    //         var result = template("template", data);
    //         result = result.replace(/&#60;/g, "<");
    //         result = result.replace(/&#62;/g, ">");
    //         result = result.replace(/&#34;/g, "'");
    //         // console.log(result);
    //         $('.items').append(result);
    //         swiper = new Swiper('.scroll-container', {
    //             scrollbar: '.scroll-bar',
    //             direction: 'vertical',
    //             slidesPerView: 'auto',
    //             mousewheelControl: true,
    //             freeMode: true,
    //             roundLengths: true, //防止文字模糊\
    //             mode: 'horizontal',
    //             observer: true, //修改swiper自己或子元素时，自动初始化swiper
    //             observeParents: true //修改swiper的父元素时，自动初始化swiper
    //         });
    //         $("footer > .footer-links a:eq(2)").on("click", function () {
    //             swiper.slideTo(0, 500, true);
    //         });
    //     }
    // });


    //     }
    // })
    // "pagesize": "每页大小",
    // "totalCount": "总条数"
    var currentPageNum = 1;
    var selectPageNum = 1;
    getData(currentPageNum);


    $('.Next').click(function () {
        if ($(this).hasClass("disabled")) {
            alert("最后一页啦 别翻啦");
            return;
        }
        currentPageNum++;
        selectPageNum++;
        getData(currentPageNum);
        $(".moneyctrl_page select").val(selectPageNum);
        $("body, html").animate("scrollTop", 0);

    })

    $('.Previous').click(function () {
        if ($(this).hasClass("disabled")) {
            alert("第一页啦 别翻啦");
            return;
        }

        currentPageNum--;
        selectPageNum--;
        getData(currentPageNum);
        $(".moneyctrl_page select").val(selectPageNum);
        $("body, html").animate("scrollTop", 0);

    })

    var totalPage;

    function getData(mypageNum) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getproductlist",
            data: {
                categoryid: urlData["categoryKey"],
                pageid: mypageNum,
            },
            success: function (data) {
                console.log(data);
                // console.log(data.pagesize);
                // console.log(data.totalCount);
                totalPage = Math.ceil(data.totalCount / data.pagesize);
                // console.log(totalPage);
                // $('.dropdown-toggle span:eq(2)').html(totalPage);
                // $('.dropdown-toggle span:eq(0)').html(mypageNum);

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

                if ($(".moneyctrl_page select").html() == "") {
                    for (var i = 1; i <= totalPage; i++) {
                        var curOption = $("<option></option>");
                        curOption.html(i + "/" + totalPage);
                        curOption.attr("value", i);
                        $(".moneyctrl_page select").append(curOption);
                    }
                }


                $("footer > .footer-links a:eq(2)").on("click", function () {
                    $("body, html").animate("scrollTop", 500);
                });

            }
        })
    }

    $(".moneyctrl_page select").on("change", function () {
        selectPageNum = $(this).val();
        currentPageNum = selectPageNum;
        getData(currentPageNum);
        $("body, html").animate("scrollTop", 0);
    })

});

// "pagesize": "每页大小",
// "totalCount": "总条数"