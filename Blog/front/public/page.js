window.onload = function () {
    var contentDiv = document.getElementById('content');
    var aside = document.getElementById('aside');
    var nodes = contentDiv.childNodes;
    var h_array = [];
    var index = 0;
    /**
     * Convert string to html
     */

    var writeHtml = function () {
        var content = $("#content").text();
            var converter = new showdown.Converter(); 
            var htmlcontent = converter.makeHtml(content); 
            $('#content').html(htmlcontent);
    }
    writeHtml();
    
    /**
     * Get an array of h tags
     */

    var getArray = function(){
        for(i in nodes){
            if(nodes[i].nodeName == 'H1' || nodes[i].nodeName == 'H2' || nodes[i].nodeName == 'H3'){
                var a = document.createElement('a');
                a.setAttribute('id', index + '');
                ++index;
                nodes[i].appendChild(a);
                h_array.push(nodes[i]);
            }
        }
        console.log(h_array[0]);
    }
    getArray();

    /**
     * create aside menu
     */
    
    var getMenu = function(){
        for(i in h_array){
            var a_obj = document.createElement('a');
            a_obj.setAttribute('href', '#' + h_array[i].childNodes[1].id);
            a_obj.setAttribute('class', h_array[i].nodeName);
            a_obj.innerHTML = h_array[i].innerHTML;
            aside.appendChild(a_obj);
        }
    }
    getMenu();
}