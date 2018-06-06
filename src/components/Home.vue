<template>
  <div class="setting-wrap">
    <div class="setting-head">
      <div class="title" v-show="isBusiness">营业中&nbsp:</div>
      <div class="title" v-show="!isBusiness">打烊中&nbsp:</div>
      <mt-switch class="switch" v-model="value" @change="change"></mt-switch>
      <div v-show="isBusiness && isBusinessTime">(未到营业时间)</div>
    </div>
    <div class="split-box">
      <div class="split-left"></div>
      <div class="split-content" v-show="!isBusiness">已打烊不再接单</div>
      <div class="split-content" v-show="isBusiness">营业时间: 08 : 00 - 20:00 </div>
      <div class="split-right"></div>
    </div>
    <div class="validation－box">
      <div class="validation-item border1px">
        <div class="validation-title">起送金额：</div>
        <div class="input-box"><input ref="handleInput" @input="handleInput" placeholder="请输入配送金额" type="text" class="input"></div>
      </div>
      <div class="validation-item border1px">
        <div class="validation-title">配送范围：</div>
        <div class="input-box"><input ref="handleRange" @input="handleRange" placeholder="请输入配送范围" type="text" class="input"></div>
      </div>
      <div class="validation-item border1px">
        <div class="validation-title">配送费：</div>
        <div class="input-box"><input ref="deliveryfree" @input="handleDelivery" type="text" placeholder="请输入配送费" class="input"></div>
      </div>
      <div class="validation-item border1px">
        <div class="validation-title">满多少免配送：</div>
        <div class="input-box"><input ref="preferential" @input="handleFree" placeholder="请输入免送费起始金额" type="text" class="input"></div>
      </div>
    </div>
    <div class="save" @click="saveCheck">保存</div>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import {
    setStore,
    getStore,
    removeStore
  } from '../utils/utils'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        value: false,
        isBusiness: true,
        isBusinessTime: false,
        sendMount: '',
        deliveryRange: '',
        deliveryfree: '',
        preferential: '',
        count: 1,
        businessId: ''
  
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.getOrderList = this.getOrderList;
        // let count = ++this.count
        // setStore('count', count)
        setInterval(() => {
          let d = new Date()
          let nowdata = d.getHours() + ':' + d.getMinutes()
          // console.log(nowdata )
          this.isBusinessRange('08:00', '20:00', nowdata)
          // console.log(0)
        }, 1000)
      })
  
    },
    methods: {
      getOrderList(data) {
        this.businessId = parseInt(data)
        if(this.businessId){
            this.getPreSave()
        }
      },
      getPreSave() {
        window.request('post', '/boss/takeoutConfigDetail', {
          businessId: this.businessId
        }, (res, self) => {
          if (res.code == 1)
            this.value = res.data.closed ? true : false;
          this.$refs.handleInput.value = this.sendMount = res.data.sendMoney || ''
          this.$refs.handleRange.value = this.deliveryRange = res.data.limitSendArea || ''
          this.$refs.deliveryfree.value = this.deliveryfree = res.data.sendPrice || ''
          this.$refs.preferential.value = this.preferential = res.data.sendPriceFree || ''
        }, () => {
          Tip('服务器返回有误', 1000, 'top');
        })
      },
      takeOut() {
        takeoutConfigDetail
      },
      change() {
        if (this.value) {
          let data = {
            businessId: this.businessId,
            closed: 1,
          }
          window.request('post', '/boss/takeoutClose', data, (res) => {
            if (res.code == 1) {
              Tip('已开启营业', 1000, 'top');
              this.isBusiness = true;
            }
  
          }, () => {
            Tip('服务器返回有误', 1000, 'top');
          })
  
        } else {
          let data = {
            businessId: this.businessId,
            closed: 0,
          }
          window.request('post', '/boss/takeoutClose', data, (res) => {
            if (res.code == 1) {
              Tip('已打烊', 1000, 'top');
              this.isBusiness = false;
            } else {
              Tip(res.message, 3000, 'top');
            }
          }, () => {
            Tip('服务器返回有误', 1000, 'top');
          })
  
        }
      },
      isBusinessRange(beginTime, endTime, nowTime) {
        // var time_range = function(beginTime, endTime, nowTime) {
        var strb = beginTime.split(":");
        if (strb.length != 2) {
          return false;
        }
  
        var stre = endTime.split(":");
        if (stre.length != 2) {
          return false;
        }
  
        var strn = nowTime.split(":");
        if (stre.length != 2) {
          return false;
        }
        var b = new Date();
        var e = new Date();
        var n = new Date();
  
        b.setHours(strb[0]);
        b.setMinutes(strb[1]);
        e.setHours(stre[0]);
        e.setMinutes(stre[1]);
        n.setHours(strn[0]);
        n.setMinutes(strn[1]);
  
        if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
          this.isBusinessTime = false;
          // return true;
        } else {
          //  alert("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
          // return false;
          this.isBusinessTime = true;
        }
        // }
      },
      handleInput(val) {
        const value = event.target.value;
        this.sendMount = value;
        // console.log(value)
      },
      handleRange(val) {
        const value = event.target.value;
        this.deliveryRange = value;
      },
      handleDelivery() {
        const value = event.target.value;
        this.deliveryfree = value;
      },
      handleFree() {
        const value = event.target.value;
        this.preferential = value;
      },
      saveCheck() {
        let meg = null;
        meg = this.sendMount == "" ? "请输入起送金额" : meg;
        if (meg) {
          Tip(meg, 3000)
          return;
        }
        let isInteger = null;
        if (!(Math.floor(this.sendMount) == this.sendMount)) {
          isInteger = "请输入整数"
        }
        if (isInteger) {
          Tip(isInteger, 3000);
          return;
        }
        meg = this.deliveryRange == "" ? "请输入配送范围" : meg;
        if (meg) {
          Tip(meg, 3000)
          return;
        }
        if (!(Math.floor(this.deliveryRange) == this.deliveryRange)) {
          isInteger = "请输入整数"
        }
        if (isInteger) {
          Tip(isInteger, 3000);
          return;
        }
        meg = this.deliveryfree == "" ? "请输入配送费" : meg;
        if (meg) {
          Tip(meg, 3000)
          return;
        }
        if (!(Math.floor(this.deliveryfree) == this.deliveryfree)) {
          isInteger = "请输入整数"
        }
        if (isInteger) {
          Tip(isInteger, 3000);
          return;
        }
        meg = this.preferential == "" ? "请输入免配送费金额" : meg;
        if (meg) {
          Tip(meg, 3000)
          return;
        }
        if (!(Math.floor(this.preferential) == this.preferential)) {
          isInteger = "请输入整数"
        }
        if (isInteger) {
          Tip(isInteger, 3000);
          return;
        }
        this.saveDate('post', '/boss/takeoutConfig', {
          businessId: this.businessId,
          sendMoney: parseInt(this.sendMount),
          limitSendArea: parseInt(this.deliveryRange),
          sendPrice: parseInt(this.deliveryfree),
          sendPriceFree: parseInt(this.preferential),
        }, (res) => {
          if (res.code == 1) {
            Tip('保存成功', 3000, 'top');
            console.log(res)
          } else {
            Tip(res.message, 3000, 'top');
          }
        }, (res) => {
          Tip('服务器返回有误', 3000, 'top');
        })
      },
      saveDate(type, url, data, successfn, errorfn) {
        window.request(type, url, data, successfn, errorfn)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .setting-wrap {
    font-size: 0.426667rem;
    font-size: 0.373333rem;
    background: #fff;
    height: 100vh;
    .setting-head {
      display: flex;
      height: 1.6rem;
      line-height: 1.6rem;
      padding: 0 0.32rem;
      .title {
        margin-right: 10px;
      }
      .mint-switch {
        margin-right: 10px;
        // height:0.48rem;
        // width:0.56rem;
      }
      // .switch{
      //   flex:1;
      // }
    }
    .split-box {
      display: flex;
      padding: 0 0.32rem;
      color: #666666;
      .split-left {
        flex: 1;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        top: -10px;
      }
      .split-content {
        flex: 2;
        text-align: center;
        // border-bottom:1px solid #999;
      }
      .split-right {
        flex: 1;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        top: -10px;
      }
    }
    .validation－box {
      margin-top: 20px;
      .validation-item {
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 0.373333rem;
        display: flex;
        // border:1px solid red;
        padding: 0 0.32rem;
        .validation-title {
          flex: 1;
          // font-size: 0.373333rem;
        }
        .input-box {
          flex: 2.5;
          height: 1.2rem;
          line-height: 1.2rem;
          position: relative;
          top: 0.2rem;
        }
        .input {
          padding: 0 0.32rem;
          color: #999;
          width: 92%;
          background: none;
          outline: none;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          resize: none;
          box-sizing: border-box;
          // border: 0px;
        }
      }
    }
    .save {
      width: 90%;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      margin: 0 auto;
      margin-top: 30px;
      // border: 1px solid #999;
      border-radius: 6px;
      background: #ffba00;
      color: #fff;
      font-size: 0.373333rem;
      font-weight: bold;
    }
    .save:active {
      background: #d19b08;
    }
  }
</style>
