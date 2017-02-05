<template lang="html">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2 v-if="category.number">
            Editer la categorie <small>Numéro : {{category.number}}</small>
          </h2>
          <h2 v-else>
            Ajouter une category
          </h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">

            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Nom <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="category.name" type="text" id="first-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Gestionnaire</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select v-on:change="onUserChange" class="form-control">
                  <option
                    v-for="user in users"
                    :value="user.number"
                    :selected="(user.number == category.managerNumber) && 'selected'"
                  >
                  {{user.username}}
                  </option>
                </select>
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                <button type="submit" v-on:click="handleSubmit" class="btn btn-success">{{buttonLabel}}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  editCategory,
  createCategory,
  getCategory,
  getUsers
} from "../../ApiConnector"

export default {
  data() {
    return {
      category: {
        managerNumber: "",
        name: "",
        number: ""
      },
      users: []
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault()
      let {number, ...categoryData} = this.category
      if(number) {
        await editCategory(number, categoryData)
      }
      else {
        await createPlace(categoryData)
      }
    },
    onUserChange: function(e) {
      console.log(e);
      this.category.managerNumber = e.target.value
    }
  },
  computed: {
    buttonLabel: function () {
      return this.category.number ? "Modifier" : "Ajouter"
    }
  },
  created: async function() {
    let {number} = this.$route.params
    this.category.number = number
    if(number) {
      let res = await getCategory(number)
      let {managedBy, ...data} = await res.json()
      this.category = {
        ...this.category,
        managerNumber: managedBy.number,
        ...data
      }
    }
    let res2 = await getUsers()
    this.users = await res2.json()
  }
}
</script>

<style lang="css">
</style>
