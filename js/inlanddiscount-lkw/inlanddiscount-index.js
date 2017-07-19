   $(function () {
       var swiper;
       demo();
       $(window).scroll(function () {
           //$(window).scrollTop()这个方法是当前滚动条滚动的距离
           //$(window).height()获取当前窗体的高度
           //$(document).height()获取当前文档的高度
           // var bot = 50; //bot是底部距离的高度
           if ($(document).height() - $(window).height() - $(window).scrollTop() < 50 && $(".productlist ul").children().length < 60) {
               demo();
           }
       });
   })
   //ajax请求数据渲染页面函数封装
   function demo() {
       $.ajax({
           url: 'http://139.199.192.48:9090/api/getinlanddiscount',
           success: function (data) {
               console.log(data);
               swiper = null;
               // var result = template('template', data)
               var result = template("productlist", data);
               result = result.replace(/&#60;/g, "<");
               result = result.replace(/&#62;/g, ">");
               result = result.replace(/&#34;/g, "'");
               // console.log(result);
               $('.productlist ul').append(result);
           }
       })
   }