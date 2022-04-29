// 写一个接口函数
$(function(){

    getUserInfo()

    // 实现退出功能 使用layUI的confirm 功能
    let layer = layui.layer
    $('#reLogindex').on('click',function(){
        layer.confirm('是否退出当前登录', {icon: 3, title:'是否退出'}, function(index){
            //do something
            // console.log('ok')
            // 清除登录后保存在本地的 身份证明---token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '../../login.html'

            layer.close(index);
          });
    })

})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method : 'GET',
        url : '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
            // 调用renderavatar()函数渲染头像
            renderAvatar(res.data)
        },
        // 强制返回登录页面
        // complete : function(res){
        //     console.log(res)
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 删除身份验证
        //         localStorage.removeItem('token')
        //         // 跳转页面
        //         location.href = '../../login.html'
        //     }
        // }
    })
}
// 声明renderAvatar 函数
function renderAvatar(user){
    // 1、更改用户名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    // 2、更改用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text_avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()
    }
}
