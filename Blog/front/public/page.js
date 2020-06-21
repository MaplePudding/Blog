window.onload = function () {
    var contentDiv = document.getElementById('content');

    var writeHtml = function () {
        var content = $("#content").text(); //获取md文本内容
            var converter = new showdown.Converter(); //初始化转换器
            var htmlcontent = converter.makeHtml(content); //将MarkDown转为html格式的内容
            $('#content').html(htmlcontent);
    }

    writeHtml();
}