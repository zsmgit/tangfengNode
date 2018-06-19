<template lang="html">
  <div class="tf-container" ref='tfContainer'>

   <tfHeader title="个人中心" :show-goback="true" :show-center="false"></tfHeader>

    <div class="add-topic-tab">
      <table>
        <tr>
          <td>姓名：</td>
          <td>{{name}}</td>
        </tr>
        <tr>
          <td>性别：</td>
          <td>{{sex}}</td>
        </tr>
        <tr>
        <td>身份证号：</td>
        <td>{{idCard}}</td>
        </tr>
        <tr>
          <td>手机：</td>
          <td>{{mobile}}</td>
        </tr>
      </table>
      <div style="text-align:center;padding-top:20px;">
        <button class="add-btn" @click="unBindMobile">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import tfHeader from './tfHeader.vue'
import axios from 'axios'
export default {
  data () {
    return {
      name: 'yemengqiang',
      sex: 'male',
      mobile: '17607553501',
      idCard: '430124XXXXXXXXYYYY'
    }
  },
  methods: {
    loadPersonalInfomation: function () {
      this.mobile = window.sessionStorage.getItem('mobile')
      axios({
        url: '/loadPersonalInfomation',
        method: 'post',
        data: {'mobile':this.mobile},
        baseURL: 'http://www.tangfeng.com/api/v1'
      }).then(res => {
        let data = res.data
        if (data.status === 'success') {
          //  alert('unbind mobile success!');
          this.name = data.name
          this.sex = data.sex
          this.idCard = data.card_num
          this.mobile = data.tel
        }
      }).catch(error => {
        let data = error.response.data
        alert(data.error_msg)
      })
    },
    unBindMobile: function () {
      axios({
        url: '/unBindMobile',
        method: 'post',
        data: {'mobile':this.mobile},
        baseURL: 'http://www.tangfeng.com/api/v1'
      }).then(res => {
        let data = res.data
        if (data.status === 'success') {
          alert('unbind mobile success!')
          window.sessionStorage.removeItem('mobile')
          this.$router.replace({
            name: 'tfBindMobile',
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
  created () {
    this.loadPersonalInfomation()
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
