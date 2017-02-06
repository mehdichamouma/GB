<template lang="html">
  <div class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
  <div class="table-responsive">
    <table class="table table-striped jambo_table">
    <thead>
    <tr class="headings">
    <th class="column-title"># </th>
    <th class="column-title">Nom </th>
    <th class="column-title">Place par défault </th>
    <th class="column-title">Categorie </th>
    <th class="column-title">Fournisseur </th>
    <th class="column-title">Prix </th>
    <th class="column-title">Quantité </th>
    <th class="column-title no-link last">
      <span class="nobr">Editer</span>
    </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="row in rows" class="even pointer">
      <td class=" ">{{row.number}}</td>
      <td class=" ">{{row.name}} </td>
      <td class=" ">{{row.defaultPlace.name}} </td>
      <td class=" ">
        {{row.category.name}}
         >
        {{row.subCategory.name}}
      </td>
      <td class=" ">{{row.provider.name}} </td>
      <td class="a-right">{{row.price}} €</td>
      <td>
        <span v-bind:class="['label', row.quantity <= row.thresholdQuantity ? 'label-danger' : 'label-success']">{{row.quantity + " " + row.unit}}</span>
      </td>
      <td class=" last">
        <router-link :to="{name: 'showProduct', params: {number: row.number}}">Voir</router-link>
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
  getProducts
} from "../../ApiConnector"
export default {
  data() {
    return {
      rows: []
    }
  },
  created: async function () {
    let res = await getProducts()
    this.rows = await res.json()
  }
}
</script>

<style lang="css">
</style>
