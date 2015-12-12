HashChange = (function(speed){
    var current = window.location.hash;

    setInterval(function(){
        if(window.location.hash != current){
            window.location.reload();
        }
    }, speed);
});
