import config from '../utils/config';
import http from '../utils/HttpUtil';
import * as userService from '../services/user';
/*namespace为此model暴露给整个应用的入口，state为初始值，React组件的getInitialState的值可以由此初始化，reducers为接口
下的各个方法，当前配置即可用loginForm/submit来调用这个submit方法，与之前(src/routes/Login.js中的dispatch路径一致)*/
export default {
  namespace: 'index',
  state: {
    user:null,
    system:null,
    module:null,
    data:null
  },
  reducers: {
    save(state, {payload:{user, system, module, data}}) {
      return { ...state, user, system, module, data };
    },
  },
  effects: {
    *checkLogin({ payload: {} }, { call, put }) {
      alert(3);
      const { data } = yield call(userService.checkLogin);
      console.log(data);
      yield put({ type: 'save', payload: { user:data.obj.user, system:data.obj.system, module:data.obj.module, data:data.list } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
