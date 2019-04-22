<template>
  <div id="cheatPanel">
    <div class="container">
      <ul class="showpanel">显示</ul>
      <div class="bottomPanel">
        <input
          type="text"
          class="userinput"
          placeholder="输入你要发送的消息">
        <button class="submit">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cheat-panel',
  };
</script>

<style scoped lang="scss">
  #cheatPanel {
    padding: 5px;
    background-color: #F8FCFD;
    border: 1px solid #E5E5E8;
    border-radius: 1px;
    .container {
      width: 260px;
      height: 290px;
      position: relative;
      .showpanel {
        height: 250px;
        list-style: none;
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
