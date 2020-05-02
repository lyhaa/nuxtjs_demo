import getStorage from './getStorage.js'; //获取window.localStorage
export default ({
  app,
  redirect
}) => {
  app.router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      if (getStorage()) {
        next();
        redirect('/list');
      } else {
        next();
      }
    } else {
      if (to.path !== '/login') {
        if (getStorage() === null || getStorage() === '') {
          next();
          redirect('/login');
        } else {
          next();
        }
      }
    }
  });
}
