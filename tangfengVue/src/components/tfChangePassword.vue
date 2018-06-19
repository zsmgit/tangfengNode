<template lang="html">
  <div>
  <table>
    <tr>
      <td>Old password：</td>
      <td><input type="password" id="txtOldPassword" placeholder="请输入Old password."
                 v-model="password.oldPassword" @focus="removeErrorClass" ></td>
    </tr>
    <tr>
      <td>New password：</td>
      <td><input type="password" id="txtNewPassword" placeholder="请输入New password."
                 v-model="password.newPassword" @focus="removeErrorClass" ></td>
    </tr>
    <tr>
      <td>New password twice：</td>
      <td><input type="password" id="txtNewPassword2" placeholder="请输入New password again."
                 v-model="password.newPassword2" @focus="removeErrorClass" ></td>
    </tr>

  </table>
    <div style="text-align:center;padding-top:20px;">
      <button class="add-btn" @click="changePassword">确定</button>
    </div>
  </div>
</template>

<script>
import tfHeader from './tfHeader.vue'
import axios from 'axios'
export default {
  data () {
    return {
      password: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      }
    }
  },
  methods: {
    changePassword: function () {
      if (this._check()) {
        axios({
          url: '/changePassword',
          method: 'post',
          data: this.password,
          baseURL: 'http://www.tangfeng.com/api/v1'
        }).then(res => {
          let data = res.data
          if (data.success === true) {
            alert('successed in changing password！')
            this.$router.replace({
              name: 'tfMemberCardList',
              params: {

              }
            })
          }
        }).catch(error => {
          let data = error.response.data
          alert(data.error_msg)
        })
      }
    },

    _check: function () {
      let oldPassword = document.querySelector('#txtOldPassword')
      let newPassword = document.querySelector('#txtNewPassword')
      let newPassword2 = document.querySelector('#txtNewPassword2')

      if (this.password.oldPassword === '' || this.password.oldPassword.length < 6) {
        oldPassword.classList.add('error-border')
      } else if (this.password.newPassword === '' || this.password.newPassword.length < 6 ||
        this.password.newPassword !== this.password.newPassword2) {
        newPassword.classList.add('error-border')
        newPassword2.classList.add('error-border')
      } else {
        return true
      }
      return false
    },

    removeErrorClass: function (e) {
      e.target.classList.remove('error-border')
    }
  },
  components: {
    tfHeader
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

.tf-container{
  height: 100%;
  background-color: $white;
  padding-top: 45px;
  .input-box{
    height:25px;
    padding:2px;
  }
  .add-topic-tab{
    padding: $padding;
    display: flex;
    text-align: center;
    font-size: $font-tag;
    min-height: 54px;   //此最小高度限制是为了解决 选择tab时，高度坍塌的问题
    border-bottom: 1px solid #dddddd;

    .topic-tab-title{
      font-size: $font-content;
      font-weight: 600;
      height: 22px;
      line-height: 22px;
    }

    .topic-tab{
      flex:1;
      position: relative;
      border: 1px solid #dddddd;
      margin: 0 $padding;
      box-sizing: content-box;
      height: 20px;
      line-height: 20px;

      &.show-tab{
        .tabs{
          max-height: 1000px;
        }

        .fa{
          transform: rotateZ(90deg);
        }
      }
      .tabs{
        position: absolute;
        top: 25px;

        width: 100%;
        text-align: center;
        border-radius: 0 0 10px 10px;
        max-height: 0;
        overflow: hidden;
        transition: all 0.5s ease;
        .tab-item{
          padding: 5px 0;
          background-color: #cccccc;

          &:not(:last-of-type){
            border-bottom: 1px solid $white;
          }
        }
      }

      .tab-text{
        width: 100%;
        display: block;
        height: 20px;
        line-height: 20px;
      }
      .fa{
        position: absolute;
        right: 0;
        top: 0;
        transition: all 0.5s ease;
        &::before{
          display: block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
        }
      }
    }
    .add-btn{
      width: 90px;
      color:white;
      text-align: center;
      background-color: $color42b;
      border-radius: $radius;
      height: 25px;
      line-height: 25px;
    }

  }

  .add-title{
    padding: $padding;
    border-bottom: 1px solid #dddddd;
    input{
      width: 100%;
      border-radius: $radius;
      line-height: 20px;
      padding: 5px;
    }
  }

  .add-content{
    padding: $padding;
    height: calc(100vh - 165px);

    textarea{
      width: 100%;
      height: 100%;
      border-radius: $radius;
      padding: 5px;
    }
  }

  .error-border{
    border: 1px solid red;
  }
}

</style>
