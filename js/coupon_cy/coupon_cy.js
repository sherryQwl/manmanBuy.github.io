$(function(){
   $.ajax({
       url:'http://139.199.192.48:9090/api/getcoupon',
       success:function(data){
            console.log(data);
            var yhq = template('yhq-cy', data);
            console.log(yhq);
           $('.quan-yhq').append(yhq);
       }
   })
    
})