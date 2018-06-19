<template lang="html">
  <div>
  {{cardId}}
  <table>
    <tr>
      <td>日期</td>
      <td>充值金额</td>
      <td>充值前余额</td>
      <td>充值后余额</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      cardRechargeRecords: [
        {itemName: 'aaaaaaaaaa', itemTimes: 1, price: 100, totalPrice: 100},
        {itemName: 'bbbbbbbbbb', itemTimes: 2, price: 200, totalPrice: 400}
      ]
    }
  },
  created () {
    this.getCardRechargeRecords()
  },

  props: {
    cardId:
      {
        type: String,
        required: true
      }
  },

  methods: {
    getCardRechargeRecords () {
      axios({
        url: '/getMemberCardDetail3',
        method: 'post',
        baseURL: 'http://www.tangfeng.com/api/v1',
        data: {
          cardId: this.cardId
        }
      }).then((res) => {
        console.log('get cardRechargeRecords success!')
        res.data.data.forEach((value, index) => {
          this.cardRechargeRecords.push(value)
        })
      }).catch(error => {
        console.log('load cardRechargeRecords failed!' + error)
      })
    }
  },

  components: {

  }
}
</script>

<style lang="scss">

</style>
