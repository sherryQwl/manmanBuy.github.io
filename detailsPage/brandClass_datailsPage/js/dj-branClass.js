/**
 * Created by dujun on 2017/7/4.
 */
var url = window.location.href;	  //获取当前页面的url
var url_names = url.split("?")

 url_names = url_names[1].split("$");

url_name = url_names[0].replace("cont=","");
// 解码
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
};
url_name = decodeUnicode(url_name);
// console.log(url_name);
//第二个值
var url_id = url_names[1].replace("name=","");
// console.log(url_id);
$("#nav .texts").text(url_name);
$("#mains .texts").text(url_name);

//通过url_id 来获取数据
$.ajax({
    url:"http://139.199.192.48:9090/api/getbrand",
    data:{
        brandtitleid:url_id
    },
    dataType:"json",
    success:function (data) {
        // console.log(data);
        var text_two = template("classId",data);
        // console.log(text_two);
        $("#mains .title").append(text_two);

  // 在此获取数据来显示销量排
        $.ajax({
            url:"http://139.199.192.48:9090/api/getbrandproductlist",
            data:{
                brandtitleid:url_id,
                // pagesize:4,
            },
            dataType:"json",
            success:function (a) {
                console.log(a);
                var text_three = template("class_Tid",a);
                $("#mains .SalesVolume").append(text_three);
                //循环遍历所有的id ，在用所有的id发送ajax 请求数据
                // console.log(a.result);
                var  eles = a.result;
                //当没有数据返回的时候就显示自己写的内容
                  if(eles.length==0){
                      // console.log("没有数据返回");
                      $("#mains #hides-o").css({display:"block"});
                      $("#mains #hides-t").css({display:"block"});
                  };
                var elebs = null;
               $.each(eles,function (index, ele) {
                   $.ajax({
                       url:"http://139.199.192.48:9090/api/getproductcom",
                       data:{
                           productid:(ele.productId),
                       },
                       dataType:"json",
                       success:function (b) {
                           // console.log(b);
                           elebs = b.result;
                          //得出数组的长度
                          if(elebs.length==0){
                              $("#mains #hides-t").css({display:"block"});
                             return;
                          };
                          //把上个ajax请求的图片和介绍拼到对象属性里面
                           for(var i = 0;i<elebs.length;i++){
                              elebs[i].productImg = eles[index].productImg;
                              elebs[i].productName = eles[index].productName;
                           };
                           var text_four = template("class_ids",b);
                           //有数据就把盒子隐藏
                           $("#mains #hides-t").css({display:"none"});
                           $("#mains .reviewArea").append(text_four);
                       }
                   });
               })
            }
        });
    }
});

//销量排行榜的数据获取
//  点击回到顶部
  $("footer .footer-links").on("click",".top-Top",function () {
      $(window).scrollTop(0);
      // console.log("我被点击了");
  });
  //点击跳转到鄙视栏
var fang = true;

  $(window).on("click",function () {
      // console.log("我是被点击了");
      if (fang){
          $("#mains #fixe").css({
              display:"none",
              position:"fixed",
              top:"40%",
              left:0,
          }).stop().fadeIn(1000);
          fang = false;
          return;
      };
      $("#mains #fixe").stop().fadeOut(1000);
      fang = true;
  });











