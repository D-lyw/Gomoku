<template>
  <div id="msgslist">
    <div class="main-container" ref="msgslist">
      <div v-for="item in msgs">
        <div v-if="item.type === 'receive'" class="msg-cont-item">
          <div class="header"><img src="../../../static/img/avatar.jpg" alt="avatar"></div>
          <div class="msg-container">
            <div class="name">{{item.username}} :</div>
            <div class="onemsg">{{item.cont}}</div>
          </div>
        </div>
        <div v-else class="msg-cont-send">
          <div class="header"><img src="../../../static/img/avatar.jpg" alt="avatar"></div>
          <div class="msg-container">
            <div class="name">: {{item.username}}</div>
            <div class="onemsg">{{item.cont}}</div>
          </div>
        </div>
      </div>
      <div class="bottomPanel">
        <input
          type="text"
          class="userinput"
          ref="input"
          @keyup.enter="submit"
          placeholder="输入你要发送的消息">
        <button @click="submit" class="submit">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'msgslist',
    data () {
      return {
        msgs: [],
        sendMsg: '',
      };
    },
    props: {
      reciveMsg: {
        type: String,
      },
    },
    watch: {
      reciveMsg: function (val) {
        this.msgs.push(val);
        console.log(this.msgs);
        this.$nextTick(() => {
          msgslist.scrollTop = msgslist.scrollHeight;
        });
      },
    },
    mounted () {
      // this.$nextTick(() => {
      //   msgslist.scrollTop = msgslist.scrollHeight;
      // });
    },
    sockets: {
      reciveMsg (data) {
        this.reciveMsg = data.msg;
      },
    },
    methods: {
      submit () {
        var result = this.$refs.input.value;
        var msgslist = this.$refs.msgslist;
        if (!result) return;
        result = {
          'username': '李四',
          'cont': result,
          'type': 'send',
        };
        this.msgs.push(result);
        this.$refs.input.value = '';
        console.log(this.msgs);
        this.newMessage(this.againstId,result);
        this.$nextTick(() => {
          msgslist.scrollTop = msgslist.scrollHeight;
        });
      },
      newMessage (againstId,sendMsg) {
        if (!!againstId) {
          this.$socket.emit('sendMsg', {againstId: againstId, msg: sendMsg});
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  #msgslist {
    padding: 5px;
    background-color: #F2F3F5;
    border: 1px solid #E5E5E8;
    border-radius: 1px;
    width: 260px;
    height: 290px;
    position: relative;
    overflow: hidden;
    .main-container {
      height: 250px;
      overflow-y: auto;
      width: 280px;
      .msg-cont-item {
        display: flex;
        flex-direction: row;
        font-size: 12px;
        margin-top: 20px;
        margin-right: 30px;

        .header img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .msg-container {
          display: flex;
          flex-direction: column;
          margin-left: 6px;
          .name {
            margin-bottom: 6px;
          }
          .onemsg {
            background-color: #FFFFFF;
            border-radius: 8px;
            padding: 8px;
            color: #252525;
            word-break: break-all;
          }
        }
      }
      .msg-cont-send {
        display: flex;
        flex-direction: row-reverse;
        font-size: 12px;
        margin-top: 6px;
        margin-left: 30px;
        .header img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .msg-container {
          display: flex;
          flex-direction: column;
          margin-right: 6px;;
          .name {
            text-align: right;
            margin-bottom: 6px;
          }
          .onemsg {
            background-color: #0188FB;
            border-radius: 8px;
            padding: 8px;
            color: white;
            word-break: break-all;
          }
        }
      }
      .bottomPanel {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        text-align: center;
        position: absolute;
        height: 30px;
        bottom: 5px;

        .userinput {
          line-height: 1;
          padding: 3px 6px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          overflow: visible;
          color: #606266;
          transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        }
        .userinput:focus {
          border-color: #409eff;
          outline: 0;
        }
        .submit {
          text-align: center;
          background-color: #2d8cf0;
          width: 50px;
          color: #eaeaea;
          cursor: pointer;
          border-radius: 3px;
          border: 1px solid transparent;
          transition: all .3s;
        }
        .submit:hover {
          color: #fff;
          background-color: #57A3F3;
        }
      }
    }
  }
</style>
