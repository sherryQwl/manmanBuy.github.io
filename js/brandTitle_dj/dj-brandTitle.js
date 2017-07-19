/**
 * Created by dujun on 2017/7/4.
 */
//品牌ID
var brandTitleId = null;

$.ajax({
     url:"http://139.199.192.48:9090/api/getbrandtitle",
     dataType:"json",
     success:function (data) {
         console.log(data);
         var test = template("djTemplate",data);
         // console.log(test);
         $(".title").append(test);
         var swiper = new Swiper('.scroll-container', {
             scrollbar: '.scroll-bar',
             direction: 'vertical',
             slidesPerView: 'auto',
             mousewheelControl: true,
             freeMode: true,
             roundLengths: true, //防止文字模糊\
         });
     }
 });
 //点击排行榜品牌，获取该种类
var  navTitle = null;//申明截取的下一页面的标题
 $("#mains").on("click",".item a",function () {
   var  text = $(this).find("div").text();
   var btId = $(this).find("div").attr("index");
     navTitle = text.replace("十大品牌","");
     //转码
     function encodeUnicode(str) {
         var res = [];
         for ( var i=0; i<str.length; i++ ) {
             res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
         }
         return "\\u" + res.join("\\u");
     }
    navTitle = encodeUnicode(navTitle);
   //参数传递
   //   window.location.href="brandClass.html?cont"+navTitle+"$name="+btId;
     $(this).attr("href",("./detailsPage/brandClass_datailsPage/brandClass.html?cont="+navTitle+"$name="+btId));
     // $.ajax({
     //     url:"./php/texts.php",
     //     data:{
     //         a:navTitle,
     //         b:btId
     //     }
     // })
 });
//  点击回到顶部
$("footer .footer-links").on("click",".top-Top",function () {
    $(window).scrollTop(0);
    // console.log("我被点击了");
})













