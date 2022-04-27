// 因为每次调用 $.get() 或者$.post()， 或者$.ajax()，都要重新写一遍根路径，因此为了方便维护和修改，
// 在 jQuery上有一个 ajaxPrefilter ，可以直接通过修改 ajaxPrefilter的options.url 来修改默认的提交参数

$(function(){
    $.ajaxPrefilter(function(options){
        options.url = 'http://www.liulongbin.top:3007' + options.url
        console.log(options.url)
    })
})