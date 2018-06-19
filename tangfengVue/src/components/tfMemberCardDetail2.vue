<template lang="html">
  <div>
  {{cardId}}
  <table>
    <tr>
      <td>日期</td>
      <td>项目</td>
      <td>次数</td>
      <td>价格</td>
      <td>金额</td>
    </tr>
    <tr>
      <td></td>
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
      cardConsumeRecords: [
        {itemName: 'aaaaaaaaaa', itemTimes: 1, price: 100, totalPrice: 100},
        {itemName: 'bbbbbbbbbb', itemTimes: 2, price: 200, totalPrice: 400}
      ]
    }
  },

  props: {
    cardId:
      {
        type: String,
        required: true
      }
  },

  created () {
    this.getCardConsumeRecords()
  },

  methods: {
    getCardConsumeRecords () {
      axios({
        url: '/getMemberCardDetail2',
        method: 'post',
        baseURL: 'http://www.tangfeng.com/api/v1',
        data: {
          cardId: this.cardId
        }
      }).then((res) => {
        console.log('get cardConsumeRecords success!')
        res.data.data.forEach((value, index) => {
          this.cardConsumeRecords.push(value)
        })
      }).catch(error => {
        console.log('load cardConsumeRecords failed!' + error)
      })
    }
  },

  components: {

  }
}
</script>

<style lang="scss">

</style>
