$(function () {
    var urlData = getUrlData();
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcouponproduct',
        data: {
            couponid: urlData.index
        },
        success: function (data) {
            // console.log(data);
            var result = template("quan-food", data);
            // console.log(result);
            // 进行转译 
            // result = result.replace(/&#60;/g, "<");
            // result = result.replace(/&#62;/g, ">");
            // result = result.replace(/&#34;/g, "'"); 
            // console.log(result);
            $('.quan-box ul').append(result);

            //页面拉伸
            var swiper = new Swiper('.scroll-container', {
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
            $("footer .footer-links a:eq(2)").click(function () {
                swiper.slideTo(0, 500, true);

            });
            // console.log($('#quan_click')[0]);



            var num = 0;
            var srcArr = [];
            var srcIndex;
            //  console.log('点击了111');
            // 动态生成出来的img的图片路径
            var lis = $('#quan_click li');
            // console.log(lis);
            var imgs = $('#quan_click img');
            // console.log(imgs);

            for (var i = 0; i < imgs.length; i++) {
                srcArr[i] = imgs[i].src;
            }
            // 点击遮罩层   遮罩层消失

            $("#quan_click").on("click", "li", function () {
                // box($(this));
                // console.log($(this).index());
                srcIndex = $(this).index();
                $('#shade').fadeIn(1000);
                $("#tupian").attr("src", srcArr[srcIndex]);
            });

            $("#shade").on("click", function () {
                $('#shade').fadeOut();
            });
            $('#arr-right').click(function (event) {
                if (srcIndex > srcArr.length) {
                    return;
                }
                srcIndex++;
                event.stopPropagation();
                $("#tupian").attr("src", srcArr[srcIndex]);
            })
            $('#arr-left').click(function (event) {
                if (srcIndex < 0) {
                    return;
                }
                srcIndex--;
                event.stopPropagation();
                $("#tupian").attr("src", srcArr[srcIndex]);
            })

        }
    })


})