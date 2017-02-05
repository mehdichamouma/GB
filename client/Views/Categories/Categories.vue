<template lang="html">
  <div class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
  <div class="table-responsive">
    <table class="table table-striped jambo_table">
    <thead>
    <tr class="headings">
    <th class="column-title"># </th>
    <th class="column-title">Nom </th>
    <th class="column-title">Gestionnaire </th>
    <th class="column-title no-link last">
      <span class="nobr">Editer</span>
    </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="row in rows" class="even pointer">
      <td class=" ">{{row.number}}</td>
      <td class=" ">{{row.name}} </td>
      <td class=" ">{{row.managedBy.username}} </td>
      <td class=" last">
        <router-link :to="{name: 'showCategory', params: {number: row.number}}">Voir</router-link>
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
  getCategories
} from "../../ApiConnector"
export default {
  data() {
    return {
      rows: []
    }
  },
  created: async function () {
    let res = await getCategories()
    this.rows = await res.json()
  }
}
</script>

<style lang="css">
</style>
