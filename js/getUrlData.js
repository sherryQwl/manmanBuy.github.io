    function getUrlData() {
        var dataStr = window.location.href.split("?")[1];

        // 分割数据
        dataArr = dataStr.split("&");

        // 声明对象存储数据键值对
        var data = {};

        // 遍历每一个数据数组 ,进行再次切割, 将第0项作为键,第1项作为值.存在对象中
        for (var i = 0; i < dataArr.length; i++) {
            let smallDataArr = dataArr[i].split("=");
            data[smallDataArr[0]] = smallDataArr[1];
        }
        return data;
    }