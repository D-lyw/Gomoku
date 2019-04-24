<template>
  <form class="login-form">
    <h1>
      <span>{{title}}</span>
      <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
    </h1>
    <input type="text" class="login-input" placeholder="User Name" v-model="username">
    <div class="btn-group">
      <button type="submit" class="login-btn" @click="doSubmit">登 录</button>
      <button class="regist-btn" @click="handleRegist">注 册</button>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    metaInfo: {
      title: 'Login page',
    },
    data () {
      return {
        username: '',
        errorMsg: '',
        userToken: '',
        title: '登录',
      };
    },
    methods: {
      doSubmit (e) {
        e.preventDefault();
        if (this.validate()) {
          axios({
            methods: 'post',
            url: '',
            data: {
              username: this.username,
            },
          }).then(res => {
            // this.userToken = res.data
            localStorage.setItem(this.username, this.username);
            this.$router.push({name: 'home', params: {username: this.username}});
          }).catch(error => {
            alert('用户名错误');
            console.log(error);
          });
        }
      },
      validate () {
        if (!this.username.trim()) {
          this.errorMsg = '用户名不能为空';
          return false;
        }
        this.errorMsg = '';
        return true;
      },
      handleRegist () {
        if (this.errorMsg) {
          this.errorMsg = '';
        }
        this.title = '注册';
      },
    },
  };
</script>

<style>
  body {
    background-image: url(../../../static/img/loginBac.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-form {
    width: 500px;
    margin: 0 auto;
    display: flex;
    background-color: #fff;
    border: 1px solid #aaa;
    padding: 30px 0px 30px 60px;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .error-msg {
    font-size: 14px;
    color: #e15050;
    margin-left: 10px;
  }

  .login-input {
    width: 400px;
    font-size: 20px;
    height: 16px;
    line-height: 16px;
    padding: 10px;
    margin-top: 30px;
  }

  .login-btn, .regist-btn {
    margin-right: 24px;
    display: inline-block;
    width: 200px;
    font-size: 20px;
    height: 40px;
    color: #fff;
    background-color: #6868c0;
    border: none;
    margin-top: 30px;
    transition: .3s all;
  }

  .login-btn:hover, .regist-btn:hover {
    background-color: #e91e63;
  }
</style>
