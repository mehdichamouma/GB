<template lang="html">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2 v-if="place.number">
            Editer le lieu de stockage <small>Numéro : {{place.number}}</small>
          </h2>
          <h2 v-else>
            Ajouter un lieu de stockage
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
                <input v-model="place.name" type="text" id="first-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">Email <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="place.placeFloor" type="text" id="last-name" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Titre</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="place.placeType" id="middle-name" class="form-control col-md-7 col-xs-12" type="text" name="middle-name">
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
  getPlace,
  createPlace,
  editPlace
} from "../../ApiConnector"

export default {
  data() {
    return {
      place: {
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
      let {number, ...placeData} = this.place
      if(number) {
        await editPlace(number, placeData)
      }
      else {
        await createPlace(placeData)
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
    this.place.number = number
    if(number) {
      let res = await getPlace(number)
      let data = await res.json()
      this.place = {
        ...this.place,
        ...data
      }
    }
  }
}
</script>

<style lang="css">
</style>
