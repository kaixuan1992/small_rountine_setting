<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Cell
  } from 'mint-ui';
  Vue.component(Cell.name, Cell);
  export default {
    name: 'App'
  }
</script>

<style>
  body,
  div,
  span,
  header,
  footer,
  nav,
  section,
  aside,
  article,
  ul,
  dl,
  dt,
  dd,
  li,
  a,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  i,
  b,
  textarea,
  button,
  input,
  select {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    box-sizing: border-box;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    -webkit-tap-highlight-color: transparent;
  }
  
  a:active {
    /* color: #4499EE; */
    text-decoration: none;
    /*CSS下划线效果：无下划线*/
    border-bottom: 1px #0099CC dotted/*CSS加一个只有下边的框 边框为虚线 */
  }
  
  a:link {
    text-decoration: none;
  }
  
  
  /* 指正常的未被访问过的链接*/
  
  a:visited {
    text-decoration: none;
  }
  
  
  /*指已经访问过的链接*/
  
  a:hover {
    text-decoration: none;
  }
  
  
  /*指鼠标在链接*/
  
  a:active {
    text-decoration: none !important;
  }
  
  
  /* 指正在点的链接*/
  
  a {
    text-decoration: none !important;
  }
  
  html {
    /* background-color: #f2f2f2; */
     background-color:#fff;
    min-height: 100vh;
  }
  
  .border1px {
    position: relative;
  }
  
  .border1px:after {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    content: '';
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .border1px:after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  
  @media only screen and (-webkit-min-device-pixel-ratio: 3) {
    .border1px:after {
      -webkit-transform: scaleY(0.33);
      transform: scaleY(0.33);
    }
  }
  .borderbefore-1px {
    position: relative;
  }
  
  .borderbefore-1px:before {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    content: '';
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .borderbefore-1px:before {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  
  @media only screen and (-webkit-min-device-pixel-ratio: 3) {
    .borderbefore-1px:before {
      -webkit-transform: scaleY(0.33);
      transform: scaleY(0.33);
    }
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center;
    color: #2c3e50; */
    /* margin-top: 60px; */
    /* background-color: #f2f2f2; */
    /* min-height: 100vh; */
  }
</style>
