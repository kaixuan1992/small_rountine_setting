// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import MintUI from 'mint-ui'
//字体

import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import { Toast } from 'mint-ui';
import $ from 'jquery'
import moment from 'moment/moment'
// import '../src/utils/utils.js'
Vue.use(Mint);
window.baseUrl = 'https://opplatform.eatjoys.com'

Vue.filter('TIMEDF', function (value, format) {

  return moment(value).format('YYYY-MM-DD HH:mm:ss')

});

Vue.use(MuseUI);
window.Tip = function (message, time,position) {
  Toast({
    message: message,
    position: position || 'buttom',
    duration: time
  });

}
window.baseUrl  = 'https://opplatform.eatjoys.com';
window.request = function(type,url,data,successfn,errorfn) {
  // let self= self;
  $.ajax({
    type: type,
    url: baseUrl + url,
    contentType: "application/x-www-form-urlencoded;charset=utf-8;",
    data:data,
    dataType: "json",
    success:function(res){
      successfn(res)
    },
    error: function (error) {
      errorfn();
      // console("error=" + error);
    }
  });
}
// import $ from 'jquery'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
