window.onload = function(){
    var button = this.document.querySelector('#button_menu');
    var aside = this.document.querySelector('#aside')
    button.addEventListener('click', function(){
        if(aside.classList.length == 0){
            aside.classList.add('extend');
        }
        else{
            if(aside.classList.contains('extend')){
                aside.classList.remove('extend');
                aside.classList.add('shrink');
            }
            else{
                aside.classList.remove('shrink');
                aside.classList.add('extend');
            }
        }
    })
}