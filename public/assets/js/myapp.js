$(function(){


  var uploadImgName = ''
  $('#fileInput').on('change',function(){
     var oFormData = new FormData()
     oFormData.append('myfile',this.files[0])
    console.log(this.files[0])

    var oFormData = new FormData()

    console.log(this.files[0])

    oFormData.append('myfile',this.files[0])

    var xhr = new XMLHttpRequest()
    xhr.open('post','/article/upload',true)
    xhr.onload = function(){
      if(this.status === 200){

            var data = xhr.responseText
            //console.log(data.imgUrl)
            uploadImgName = data;
            $('#uploadImg').attr('src',data).width(100)
        }
    }
    xhr.send(oFormData)

    // $.ajax({
    //         url: '/article/upload',
    //         data: oFormData,
    //         processData: false,
    //         type: 'POST',
    //         contentType: 'multipart/form-data',
    //         mimeType: 'multipart/form-data',
    //         success: function (data) {
    //             alert(data);
    //         }
    //     });
  })

  //添加文章
  $('#submit').on('click',function(){

    var title = $('#title').val().trim()
    var author = $('#author').val().trim()
    var $type = $('#article-type')
    var content = $('#content').val().trim()
    var files = $('#fileInput').val()
    console.log(title)
    // if(!title || !conetnt){
    //   return false;
    // }
    //


    $.post('/article/add',{
      params:JSON.stringify({
        title:title,
        author:author,
        type:3,
        content:content,
        img:uploadImgName,
      })
    },function(data){
        if(data.rs == 'ok'){
          alert('添加成功！')
          location.href="/article/list"
        }
    },'json')

    return false;

  })

  $('#update-submit').on('click',function(){
    var id = $(this).data().id
    var title = $('#title').val().trim()
    var author = $('#author').val().trim()
    var $type = $('#article-type')
    var content = $('#content').val().trim()
    var files = $('#fileInput').val()
    console.log(title)
    // if(!title || !conetnt){
    //   return false;
    // }
    //


    $.post('/article/update2',{
      params:JSON.stringify({
        id:id,
        params:{
          title:title,
          author:author,
          type:3,
          content:content,
          img:uploadImgName,
        }
      })
    },function(data){
        if(data.rs == 'ok'){
          alert('修改成功！')
          location.href="/article/list"
        }
    },'json')

    return false;

  })

  // 删除新闻列表
  $('#articles-list').on('click','button.del',function(){
    console.log('--')
    var data = $(this).data()
    $.post('/article/remove',{id:data.id},function(result){
      if(result.rs){
        location.reload()
      }
    },'json')
  })

  // 添加评论
  $('#comments-submit').on('click',function(e){
    var nick = $('#cm-title').val()
    var con = $('#cm-content').val()
    var id=$('#article-id').val()
    e.preventDefault()
    $.post('/comment/add',{
      arId:id,
      nick:nick,
      content:con,
      createTime:Date.now()
    },function(result){
      if(result.rs){
        setTimeout(function(){
          location.reload()
        },1000)
      }
    })
  })

  //注册
  $('#reg-box').on('submit',function(){
    var $regbox = $('#reg-box')
    var username = $regbox.find('.username').val().trim()
    var password = $regbox.find('.password').val().trim()
    var repassword = $regbox.find('.repassword').val().trim()

    if(!username || !password || !repassword) return false;
    if(password !== repassword){
      alert('输入的密码不同,请确认！')
      return false;
    }
    $.post('/api/reg',{
      username:username,
      password:password
    },function(data){
      if(data.rs){
        alert('注册成功')
        location.href = '/user/login'
      }else{
        alert(data.error)
      }
    },'json')
    return false;

  })

  //登录
  $('#login-box').on('submit',function(){
    var $regbox = $('#login-box')
    var username = $regbox.find('.username').val().trim()
    var password = $regbox.find('.password').val().trim()

    if(!username || !password ) return false;

    $.post('/api/login',{
      username:username,
      password:password
    },function(data){
      if(data.rs){
        alert('登录成功')
        location.href = '/'
      }else{
        alert(data.error)
      }
    },'json')
    return false;

  })
})
