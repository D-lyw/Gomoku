<template>
  <form class="login-form" @submit="doSubmit">
    <h1>
      <span>Login</span>
      <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
    </h1>
    <input type="text" class="login-input" placeholder="User Name" v-model="username">
    <input type="password" class="login-input" placeholder="password" v-model="password">
    <button type="submit" class="login-btn">登 录</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  metaInfo: {
    title: 'Login page'
  },
  data () {
    return {
      username: '',
      password: '',
      errorMsg: '',
      userToken: ''
    }
  },
  methods: {
    doSubmit (e) {
      e.preventDefault()
      if (this.validate()) {
        axios({
          methods: 'post',
          url: '',
          data: {
            username: this.username,
            password: this.password
          }
        }).then(res => {
          // this.userToken = res.data
          localStorage.setItem('Authorization', this.userToken)
          this.$router.replace('/home')
        }).catch(error => {
          alert('账号密码错误')
          console.log(error)
        })
      }
    },
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = '姓名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

<style media="screen">
  .login-form{
    width: 500px;
    margin: 0 auto;
    height: 350px;
    background-color: #fff;
    border: 1px solid #aaa;
    padding-left: 60px;
    padding-top: 30px;
  }
  .error-msg{
    font-size: 14px;
    color: #e15050;
    margin-left: 10px;
  }
  .login-input{
    width: 400px;
    font-size: 20px;
    height: 16px;
    line-height: 16px;
    padding: 10px;
    margin-top: 30px;
  }
  .login-btn{
    width: 425px;
    font-size: 20px;
    height: 40px;
    color: #fff;
    background-color: #6868c0;
    border: none;
    margin-top: 30px;
    transition: .3s all;
  }
  .login-btn:hover{
    background-color: #e91e63;
  }
</style>
