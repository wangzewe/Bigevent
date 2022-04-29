// 因为每次调用 $.get() 或者$.post()， 或者$.ajax()，都要重新写一遍根路径，因此为了方便维护和修改，
// 在 jQuery上有一个 ajaxPrefilter ，可以直接通过修改 ajaxPrefilter的options.url 来修改默认的提交参数

$(function(){
    // 在发起真正的ajax之前，拼接url路径
    $.ajaxPrefilter(function(options){
        options.url = 'http://www.liulongbin.top:3007' + options.url
        // 统一为有权限的接口，设置headers请求头
        if(options.url.indexOf('/my/') !== -1){
            options.headers = {
                Authorization:localStorage.getItem('token') || ''
            }
        }



        // 全局挂载 一个 complete 
        // 强制返回登录页面
        options.complete = function(res){
            // console.log(res)
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                // 删除身份验证
                localStorage.removeItem('token')
                // 跳转页面
                location.href = '../../login.html'
            }
        }
    })
    
})
// 'http://api-breakingnews-web.itheima.net
// http://www.liulongbin.top:3007
// 'http://ajax.frontend.itheima.net'
