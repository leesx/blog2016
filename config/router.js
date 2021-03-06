import * as AppIndex from  './../controllers/index';
import * as User from './../controllers/user';


import * as Members from './../controllers/members';
import * as Articles from './../controllers/articles';
import * as Comments from './../controllers/comments';

export default (app)=>{
  // pre handle user
  // app.use(function(req, res, next) {
  //   // var _user = req.session.user
  //   //
  //   // app.locals.user = _user
  //
  //   next()
  // })

  app.get('/', AppIndex.index);
  app.post('/api/likes', AppIndex.likes);


  app.get('/member/index', Members.index);

  //注册
  app.get('/user/reg',User.reg)
  app.post('/api/reg',User.regApi)

  //登录
  app.get('/user/login',User.login)
  app.post('/api/login',User.loginApi)
  app.get('/user/loginout',User.loginout)

  app.get('/article', Articles.index);
  app.get('/article/search', Articles.search);
  app.get('/article/add', Articles.add);
  app.get('/article/list', Articles.list);
  app.get('/article/detail', Articles.detail,Comments.list);
  app.post('/api/articleCreate', Articles.create);
  app.post('/article/upload', Articles.upload);
  app.post('/article/remove', Articles.remove);
  app.get('/article/update', Articles.update);
  app.post('/api/articleUpdate', Articles.articleUpdate);

  app.post('/api/reply', Comments.reply);


  app.get('/comment/index', Comments.index);
  app.post('/comment/add', Comments.add);
}
// module.exports = function(app){
//
// }
