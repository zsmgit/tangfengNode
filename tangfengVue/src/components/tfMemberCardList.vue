<template lang="html">
  <div class="tf-container" ref='tfContainer'>

   <tfHeader title="我的会员卡" :show-goback="false" :show-center="true"></tfHeader>
    <div id="mycards" style="height:800px;overflow-y:auto;">
    <div class="add-topic-tab" v-for="memberCard in memberCards" :key="memberCard" style="width:100%;">
      <router-link :to="{ name: 'tfMemberCardDetail', params: {id : memberCard.id} }" style="width:100%;">
        <div style="width:100%; padding:10px;border:1px solid darksalmon;border-radius: 5px;text-align:left;">
           <span style="color:darkblue;font-size:16px;font-weight:bold;">{{memberCard.typeName}}</span>
           <span style="float:right;color:red;font-size:16px;">余额：{{memberCard.balance}}</span><br />
           <span style="color:black;font-size:16px;font-style:italic;">卡号：{{memberCard.number}}</span>  <br /><br />
           <span style="color:black;font-size:16px;font-weight:bold;">价值：{{memberCard.originalPrice}}</span>
           &nbsp;&nbsp;&nbsp;&nbsp;
           <span style="color:black;font-size:16px;">售价：{{memberCard.sellPrice}}</span>
           &nbsp;&nbsp;&nbsp;&nbsp;
          <span style="color:black;font-size:16px;float:right;font-style:italic;">{{memberCard.cardDate}}</span>
        </div>
      </router-link>
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
      wxCode: '',
      wxOpenId: '',
      mobile: '',
      cardDate: '',
      memberCards: [
        {id: 1, typeName: '金卡', balance: 999, number: '11111111111111', originalPrice: 2125, sellPrice: 2000, cardDate: '2018/01/01'},
        {id: 2, typeName: '银卡', balance: 888, number: '2222222222222', originalPrice: 2225, sellPrice: 2100, cardDate: '2018/01/02'},
        {id: 3, typeName: 'XXX卡', balance: 777, number: '33333333333333333', originalPrice: 2325, sellPrice: 2200, cardDate: '2018/01/03'},
        {id: 4, typeName: 'VIP卡', balance: 666, number: '444444444444444', originalPrice: 2425, sellPrice: 2300, cardDate: '2018/01/04'}
      ]
    }
  },

  methods: {
  	getWxCode:function() {
			var name, value;
			var url = window.location.search;
			var params ={}
			if(url.indexOf("?") != -1) {
				var str = url.substr(1);
				var arr = str.split("&");
				for(var i = 0; i < arr.length; i++) {
					num = arr[i].indexOf("=");
					if(num > 0) {
						name = arr[i].substring(0, num);
						value = arr[i].substr(num + 1);
						params[name] = value;
					}
				}
				return params.code
			}
			return null
		},
  	loadMemberCardList:function() {
      axios({
        url: '/loadMemberCardList',
        method: 'post',
        baseURL: 'http://www.tangfeng.com/api/v1',
        data: {
          mobile: this.$store.getters.mobile,
          wxOpenId: this.$store.getters.wxOpenId
        }
      }).then((res) => {
        console.log('load memberCards success!')
        // 每次加载后 将数据push到 topics 中；topics中是所有要展示的数据
        res.data.data.forEach((value, index) => {
          this.memberCards.push(value)
        })
      }).catch(error => {
        console.log('load memberCards failed!' + error)
      })
    },
    login () {
    	var wxCode = this.$options.methods.getWxCode();
      if (!window.sessionStorage.getItem('mobile')) {
        axios({
          url: '/login',
          method: 'post',
          baseURL: 'http://www.tangfeng.com/api/v1',
          data: {
            wxCode: wxCode
          }
        }).then((res) => {
          
          let data = res.data
          this.mobile = data.mobile
          
          if(!!data.mobile){
	          	// 验证通过后，写入store 标志登录成功
	          	this.$store.commit('ADD_USER_INFO', {
	          	  mobile: data.mobile,
	          	  wxOpenId: data.wxOpenId
	          	})
	          	window.sessionStorage.setItem('mobile', this.mobile)
	          	this.$options.methods.loadMemberCardList ()
          }
          
          this.$router.push({
              name: 'tfBindMobile',
              params: {
								wxOpenId:data.wxOpenId
              }
            })
        }).catch((error) => {
          alert(error.response.data.error_msg)
        })
      }
    }
  },

  created () {
    this.login()
  },
  components: {
    tfHeader
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

.tf-container{

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
