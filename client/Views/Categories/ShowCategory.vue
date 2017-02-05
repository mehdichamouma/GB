<template lang="html">
  <div class="row">
  <div class="row">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <div class="x_panel">
        <h2>{{category.name}}</h2>
        <div class="row">
        <div class="animated flipInY ">
          <div class="tile-stats col-md-6">
            <div class="count">179</div>

            <h3>Produits</h3>
            <router-link to="" class="btn btn-success">Ajouter produit</router-link>
          </div>

        </div>
        <div class="animated flipInY ">
          <div class="tile-stats col-md-6">
            <div class="count">{{category.subCategories.length}}</div>

            <h3>Sous-catégories</h3>
            <router-link :to="{name: 'createSubCategory', params: {catNumber: category.number}}" class="btn btn-success">Ajouter une sous-catégorie</router-link>
          </div>

        </div>
      </div>

        <button type="button" class="btn btn-primary btn-lg">Ajouter une Sous-Catégorie</button>
      </div>
    </div>
  <div class="col-md-6 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>Sous-catégories</h2>
        <div class="clearfix" />
      </div>
      <div class="x_content">

        <div class="table-responsive">
        <table class="table table-striped jambo_table">
        <thead>
        <tr class="headings">
        <th class="column-title"># </th>
        <th class="column-title">Nom </th>
        <th class="column-title no-link last">
          <span class="nobr">Editer</span>
        </th>
        </tr>
        </thead>

        <tbody>

        <tr v-for="row in category.subCategories" class="even pointer">
          <td class=" ">{{row.number}}</td>
          <td class=" ">{{row.name}} </td>
          <td class=" last">
            <router-link :to="{name: 'editSubCategory', params: {
              number: row.number,
              catNumber: category.number
            }}">Editer</router-link>
          </td>
        </tr>

        </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  getCategory
} from "../../ApiConnector"
export default {
  data() {
    return {
      category: {
        subCategories: []
      }
    }
  },
  created: async function () {
    let {number} = this.$route.params
    if(number) {
      this.category.number = number
      let res = await getCategory(number)
      this.category = await res.json()
    }
  }
}
</script>

<style lang="css">
</style>
