<template lang="html">
  <div class="membercard-container" ref='membercardContainer'>

   <tfHeader title="会员卡信息" :show-goback="true" :show-center="false"></tfHeader>
   <div id="mycard" style="height:800px;overflow-y:auto;">
    <table>
      <tr>
        <td>卡类型：</td>
        <td>{{cardId}}</td>
        <td>卡号：</td>
        <td>{{cardType}}</td>
      </tr>
      <tr>
        <td>开卡日期：</td>
        <td>{{cardDate}}</td>
        <td>余额：</td>
        <td>{{balance}}</td>
      </tr>
      <tr>
        <td>价值：</td>
        <td>{{originalPrice}}</td>
        <td>售价：</td>
        <td>{{sellPrice}}</td>
      </tr>
      <tr>
        <td>折扣：</td>
        <td>{{discount}}</td>
        <td>：</td>
        <td></td>
      </tr>
    </table>

     <nav>
       <a href="javascript:void(0);" @click="toggleTabs('detail1');">{{tfMemberCardDetail1}}</a>
       <a href="javascript:void(0);" @click="toggleTabs('detail2');">{{tfMemberCardDetail2}}</a>
       <a href="javascript:void(0);" @click="toggleTabs('detail3');">{{tfMemberCardDetail3}}</a>
       <!--<a href="javascript:void(0);" @click="toggleTabs(forth);">{{forth}}</a>-->
     </nav>
   <detail1 :is="currentView" keep-alive v-bind:cardId="cardId"></detail1>

  </div>
  </div>

</template>

<script>
import tfHeader from './tfHeader.vue'
import axios from 'axios'

import detail1 from '../components/tfMemberCardDetail1.vue'
import detail2 from '../components/tfMemberCardDetail2.vue'
import detail3 from '../components/tfMemberCardDetail3.vue'

export default {
  data () {
    return {
      cardId: 'xxx',
      cardType: 'yyy',
      originalPrice: 'zzz',
      sellPrice: 'aaa',
      cardDate: 'bbb',
      balance: 'ccc',
      discount: 'ddd',
      tfMemberCardDetail1: '包含项目', // 导航栏文本1
      tfMemberCardDetail2: '消费记录', // 导航栏文本2
      tfMemberCardDetail3: '充值记录', // 导航栏文本3
      //  forth: "在线充值", //导航栏文本4
      currentView: 'detail1' //  默认选中子组件

    }
  },
  created () {
    this.getMemberCardDetail()
  },

  methods: {
    getMemberCardDetail () {
      axios({
        url: '/getMemberCardDetail',
        method: 'post',
        baseURL: 'http://www.tangfeng.com/api/v1',
        data: {'id':this.$route.params.id}
      }).then((res) => {
        this.cardType = res.data.data.cardType
        this.originalPrice = res.data.data.originalPrice
        this.sellPrice = res.data.data.sellPrice
        this.cardDate = res.data.data.cardDate
        this.balance = res.data.data.balance
        this.discount = res.data.data.discount
      }).catch(error => {
        console.log('load memberCardDetail failed!' + error)
        alert('load memberCardDetail failed!' + error)
      })
    },

    toggleTabs (tabText) {
      this.currentView = tabText
    }

  },

  components: {
    tfHeader, detail1, detail2, detail3
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

.membercard-container{

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
