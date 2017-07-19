$(function () {
    // var 
    // for(var i = 0; )
    $.ajax({
        url: "http://139.199.192.48:9090/api/getcategorytitle",
        success: function (data) {
            console.log(data);
            var result = template("categoryItem-modal", data);
            $("main").html(result);
            $("main").on("click", ".title", function () {
                var $this = $(this);
                if (!$(this).hasClass("open")) {
                    console.dir(this);
                    $this.parent().siblings().find(".title").find("span").removeClass("rotate");
                    $.ajax({
                        url: "http://139.199.192.48:9090/api/getcategory",
                        data: {
                            titleid: $this.children("a").attr("data-id")
                        },
                        success: function (data) {
                            $this.find("span").addClass("rotate");
                            console.log(data);
                            var result = template("smallCategoryItem-moadl", data);
                            $this.next().html(result);
                            $this.next().css("display", "none")
                            $this.next().slideDown(500).parent().siblings().find(".content").slideUp;
                            console.log($this.next().stop().slideDown(500).parent().siblings().children("div:last-child").stop().slideUp(500));
                        }
                    });
                } else {
                    $this.find("span").removeClass("rotate");
                    $this.next().stop().slideUp(500);
                }
            })
        }
    });
    $("footer .footer-links a:eq(2)").on("click", function(){
        $("html, body").stop().animate({
            scrollTop: 0
        }, 500);
    });
});