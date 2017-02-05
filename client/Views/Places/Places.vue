<template lang="html">
  <div class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
  <div class="table-responsive">
    <table class="table table-striped jambo_table bulk_action">
    <thead>
    <tr class="headings">
    <th>
      <input type="checkbox" id="check-all" class="flat">
    </th>
    <th class="column-title"># </th>
    <th class="column-title">Nom </th>
    <th class="column-title">Etage </th>
    <th class="column-title">Type </th>
    <th class="column-title no-link last"><span class="nobr">Editer</span>
    </th>
    <th class="bulk-actions" colspan="7">
      <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
    </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="row in rows" class="even pointer">
      <td class="a-center ">
        <input type="checkbox" class="flat" name="table_records">
      </td>
      <td class=" ">{{row.number}}</td>
      <td class=" ">{{row.name}} </td>
      <td class=" ">{{row.placeFloor}} </td>
      <td class=" ">{{row.placeType}}</td>
      <td class=" last">
        <router-link :to="{name: 'editPlace', params: {number: row.number}}">Editer</router-link>
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
  getPlaces
} from "../../ApiConnector"
export default {
  data() {
    return {
      rows: []
    }
  },
  created: async function () {
    let res = await getPlaces()
    this.rows = await res.json()
  }
}
</script>

<style lang="css">
</style>
