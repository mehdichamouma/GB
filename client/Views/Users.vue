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
    <th class="column-title">Nom d'utilisateur </th>
    <th class="column-title">E-mail </th>
    <th class="column-title">Role </th>
    <th class="column-title">Titre </th>
    <th class="column-title no-link last"><span class="nobr">Editer</span>
    </th>
    <th class="bulk-actions" colspan="7">
      <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
    </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="user in users" class="even pointer">
      <td class="a-center ">
        <input type="checkbox" class="flat" name="table_records">
      </td>
      <td class=" ">{{user.number}}</td>
      <td class=" ">{{user.username}} </td>
      <td class=" ">{{user.email}} </td>
      <td class=" ">{{user.role}}</td>
      <td class=" ">{{user.title}}</td>
      <td class=" last">
        <router-link :to="{name: 'editUser', params: {number: user.number}}">Editer</router-link>
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
  getUsers
} from "../ApiConnector"
export default {
  data() {
    return {
      users: []
    }
  },
  created: async function () {
    let res = await getUsers()
    this.users = await res.json()
  }
}
</script>

<style lang="css">
</style>
