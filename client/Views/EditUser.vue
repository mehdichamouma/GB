<template lang="html">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2 v-if="number">
            Editer l'utilisateur <small>Numéro : {{number}}</small>
          </h2>
          <h2 v-else>
            Ajouter l'utilisateur
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
                <input v-model="username" type="text" id="first-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Email <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="email" type="text" id="last-name" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Titre</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="title" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Password</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="password" type="password" class="form-control" >
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
  getUser,
  createUser,
  editUser
} from "../ApiConnector"

export default {
  data() {
    return {
      username: "",
      title: "",
      role: "",
      password: null,
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault()
      let data = {
        username: this.username,
        title: this.title,
        role: this.role,
        email: this.email
      }
      if(this.password) {
        data.password = this.password
      }
      console.log(data);
      if(this.number) {
        await editUser(this.number, data)
        //edit user
      }
      else {
        await createUser(data)
        //create user
      }
    }
  },
  computed: {
    buttonLabel: function () {
      return this.number ? "Modifier" : "Ajouter"
    }
  },
  created: async function() {
    let {number} = this.$route.params
    this.number = number
    if(number) {
      let res = await getUser(number)
      let user = await res.json()
      this.username = user.username
      this.title = user.title
      this.role = user.role
      this.email = user.email
      this.number = user.number
    }
  }
}
</script>

<style lang="css">
</style>
