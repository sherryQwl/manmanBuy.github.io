document.documentElement.style.fontSize = window.innerWidth / 10 + "px";
window.onload = function () {
        $("footer .footer-links a:eq(2)").on("click", function () {
                $("html,body").animate({
                        scrollTop: 0
                }, 500);
        })
        setTimeout(function () {
                $("a").css("text-decoration", "none");
        }, 500);
}