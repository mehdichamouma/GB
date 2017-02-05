<template lang="html">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2 v-if="provider.number">
            Editer le fournisseur <small>Numéro : {{provider.number}}</small>
          </h2>
          <h2 v-else>
            Ajouter un fournisseur
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
                <input v-model="provider.name" type="text" id="first-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Email <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="provider.email" type="text" id="last-name" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Adresse</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="provider.adress" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
              </div>
            </div>

            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Ville</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="provider.city" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
              </div>
            </div>
            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Code postal</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="provider.postCode" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
              </div>
            </div>
            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Numéro de téléphone</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="provider.phoneNumber" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
              </div>
            </div>
            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Fax</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="provider.fax" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
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
  getProvider,
  createProvider,
  editProvider
} from "../../ApiConnector"

export default {
  data() {
    return {
      provider: {
        number: null,
        name: "",
        placeFloor: "",
        placeType: "",
      }
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault()
      let {number, ...providerData} = this.provider
      if(number) {
        await editProvider(number, providerData)
      }
      else {
        await createProvider(providerData)
      }
    }
  },
  computed: {
    buttonLabel: function () {
      return this.provider.number ? "Modifier" : "Ajouter"
    }
  },
  created: async function() {
    let {number} = this.$route.params
    this.provider.number = number
    if(number) {
      let res = await getProvider(number)
      let data = await res.json()
      this.provider = {
        ...this.provider,
        ...data
      }
    }
  }
}
</script>

<style lang="css">
</style>
