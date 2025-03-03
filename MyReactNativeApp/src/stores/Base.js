import {observable, action} from 'mobx';

class Base {
  @observable isLogin;

  constructor() {
    this.isLogin = false;
  }

  @action setIsLogin(isLogin) {
    this.isLogin = isLogin;
  }
}

export default new Base();
