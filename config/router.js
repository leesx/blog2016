var AppIndex = require('./../controllers/index');


var Members = require('./../controllers/members');
var Articles = require('./../controllers/articles');
var Comments = require('./../controllers/comments');

module.exports = function(app){
  // pre handle user
  // app.use(function(req, res, next) {
  //   // var _user = req.session.user
  //   //
  //   // app.locals.user = _user
  //
  //   next()
  // })
  app.use('/', AppIndex.index);

  app.use('/member/index', Members.index);

  app.use('/article/index', Articles.index);
  app.use('/article/list', Articles.list);
  app.use('/article/detail', Articles.detail);
  app.use('/article/add', Articles.add);


  app.use('/comment/index', Comments.index);
}
