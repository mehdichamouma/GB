<template lang="html">
  <div class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
  <div class="table-responsive">
    <table class="table table-striped jambo_table">
    <thead>
    <tr class="headings">
    <th class="column-title"># </th>
    <th class="column-title">Utilisateur </th>
    <th class="column-title">Date de la commande </th>
    <th class="column-title">Date de livraison </th>
    <th class="column-title">Status </th>
    <th class="column-title">Prix total</th>
    <th class="column-title no-link last">
      <span class="nobr">Editer</span>
    </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="row in rows" class="even pointer">
      <td class=" ">{{row.number}}</td>
      <td class=" ">{{row.orderCreator.username}}</td>
      <td class=" ">{{row.orderDate}}</td>
      <td class=" ">{{row.deliveryDate}}</td>
      <td class=" "><orderstatus :status="row.status"></orderstatus></td>
      <td class=" ">{{row.totalPrice}} €</td>
      <td class=" last">
        <router-link :to="{name: 'showOrder', params: {number: row.number}}">Voir</router-link>
      </td>
    </tr>

    </tbody>
    </table>
    </div>
  </div>
</div>
</template>

<script>
import {
  getOrders
} from "../../ApiConnector"

import Orderstatus from "./OrderStatusBadge.vue"

export default {
  components: {
    Orderstatus
  },
  data() {
    return {
      rows: []
    }
  },
  created: async function () {
    let res = await getOrders()
    let rows = await res.json()
    this.rows = rows.map(r => {
      let totalPrice
      if(r.orderRows) {
        totalPrice = r.orderRows.reduce((price, ord_row) => {
          return price + ord_row.unitPrice * ord_row.quantity
        }, 0)
      }
      return {
        ...r,
        deliveryDate: new Date(r.deliveryDate),
        orderDate: new Date(r.deliveryDate),
        totalPrice
      }
    })
    .sort((a, b) => {
      return a.orderDate < b.orderDate
    })
  }
}
</script>

<style lang="css">
</style>
