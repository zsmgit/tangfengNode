<template lang="html">
  <div>
  {{cardId}}
     <table>
       <tr>
         <td>项目</td>
         <td>次数</td>
         <td>价格</td>
         <td>金额</td>
       </tr>
       <tr v-for="cardItem in cardItems" :key="cardItem">
         <td>{{cardItem.itemName}}</td>
         <td>{{cardItem.itemTimes}}</td>
         <td>{{cardItem.price}}</td>
         <td>{{cardItem.totalPrice}}</td>
       </tr>
     </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      cardItems: [
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
    this.getCardItems()
  },

  methods: {
    getCardItems () {
      axios({
        url: '/getMemberCardDetail1',
        method: 'post',
        baseURL: 'http://www.tangfeng.com/api/v1',
        data: {
          cardId: this.cardId
        }
      }).then((res) => {
        console.log('get cardItems success!')
        res.data.data.forEach((value, index) => {
          this.cardItems.push(value)
        })
      }).catch(error => {
        console.log('load cardItems failed!' + error)
      })
    }
  },

  components: {

  }
}
</script>

<style lang="scss">

</style>
