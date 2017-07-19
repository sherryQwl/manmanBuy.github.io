window.onload = function () {
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
}