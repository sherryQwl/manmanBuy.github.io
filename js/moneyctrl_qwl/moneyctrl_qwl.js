$(function () {
    //总页码的计算方法 总条数/每一页的个数
    //默认获取第一页的数据
    var currentPageNum = 1;
    var selectPageNum = 1;
    getData(currentPageNum);

    //点击 下一页
    var swiper;
    $(".Next").click(function () {
        console.log("下一页");
        //如果点击的时候 这个a标签又disabled这个类名 return
        if ($(this).hasClass("disabled")) {
            alert("后面没有了");
            return;
        }
        //页码++
        currentPageNum++;
        selectPageNum++;
        getData(currentPageNum);
        $(".moneyctrl_bottom select").val(selectPageNum);
        $(window).scrollTop(0);
    })

    //点击 上一页
    $(".Previous").click(function () {
        console.log("上一页");
        //如果点击的时候 这个a标签又disabled这个类名 return
        if ($(this).hasClass("disabled")) {
            alert("已经是第一页了哦");
            return;
        }
        //页码++
        currentPageNum--;
        selectPageNum--;
        $(".moneyctrl_bottom select").val(selectPageNum);
        getData(currentPageNum);
        $(window).scrollTop(0);        
    })

    //参数1 pageId写死
    function getData(mypageId) {
        //加载页面的内容
        $.ajax({
            url: "http://139.199.192.48:9090/api/getmoneyctrl",
            data: {
                pageid: mypageId
            },
            success: function (data) {
                // $(".moneyctrl_bottom select").html("");
                console.log(data);
                var result = template("moneyctrl", data);
                result = result.replace(/&#60;/g, "<");
                result = result.replace(/&#62;/g, ">");
                result = result.replace(/&#34;/g, "'");
                // console.log(result);
                $(".items").html(result);
                //计算总页数 
                var totalPage = Math.ceil(data.totalCount / data.pagesize);
                console.log(totalPage);
                //判断是否是最后一页
                if (currentPageNum == totalPage) {
                    console.log("最后一页");
                    $(".Next").addClass("disabled");
                } else {
                    $(".Next").removeClass("disabled");
                }
                //判断是否是第一页
                if (currentPageNum == 1) {
                    console.log("第一页");
                    $(".Previous").addClass("disabled");
                } else {
                    $(".Previous").removeClass("disabled");
                }
                console.log(currentPageNum, totalPage);

                if ($(".moneyctrl_bottom select").html() == "") {
                    for (var i = 1; i <= totalPage; i++) {
                        var curOption = $("<option></option>");
                        curOption.html(i + "/" + totalPage);
                        curOption.attr("value", i);
                        $(".moneyctrl_bottom select").append(curOption);
                    }
                }
            }
        })
    }
    $(".moneyctrl_bottom select").on("change", function () {
        selectPageNum = $(this).val();
        currentPageNum = selectPageNum;
        getData(currentPageNum);
        $(window).scrollTop(0);                
    });
    $("footer .footer-links a:eq(2), .toTop").on("click", function(){
        $("body, html").animate({scrollTop: 0}, 300);        
    });
})