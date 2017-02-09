<template lang="html">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2 v-if="product.number">
            Editer le produit <small>Numéro : {{product.number}}</small>
          </h2>
          <h2 v-else>
            Ajouter un produit
          </h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <form class="form-horizontal form-label-left">

            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Nom <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input v-model="product.name" type="text" id="first-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Prix <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                      <input v-model="product.price" type="text" class="form-control" id="inputSuccess3" placeholder="Prix">
                      <span class="form-control-feedback right" aria-hidden="true">€</span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Unité <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                      <input v-model="product.unit" type="text" id="first-name" required="required" class="form-control col-md-7 col-xs-12">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Quantité initiale <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                      <input v-model="product.quantity" required="required" type="text" class="form-control" id="inputSuccess3" placeholder="Quantité">
                      <span class="form-control-feedback right" >{{product.unit}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Quantité d'alerte <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                      <input v-model="product.thresholdQuantity" type="text" class="form-control" id="inputSuccess3" placeholder="Quantité d'alerte">
                      <span v-if="product.unit" class="form-control-feedback right">{{product.unit}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Fournisseur</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select v-on:change="onProviderChange" class="form-control">
                  <option
                    v-for="provider in providers"
                    :value="provider.number"
                    :selected="(provider.number == product.providerNumber) && 'selected'"
                  >
                  {{provider.name}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Place par défault</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select v-on:change="onPlaceChange" class="form-control">
                  <option
                    v-for="place in places"
                    :value="place.number"
                    :selected="(place.number == product.defaultPlaceNumber) && 'selected'"
                  >
                  {{place.name}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Categorie</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select v-on:change="onCategoryChange" class="form-control">
                  <option
                    v-for="category in categories"
                    :value="category.number"
                    :selected="(category.number == product.categoryNumber) && 'selected'"
                  >
                  {{category.name}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Sous-Categorie</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select v-on:change="onSubCategoryChange" class="form-control">
                  <option
                    v-for="subCategory in subCategories"
                    :value="subCategory.number"
                    :selected="(subCategory.number == product.subCategoryNumber) && 'selected'"
                  >
                  {{subCategory.name}}
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
  editProduct,
  createProduct,
  getProduct,
  getPlaces,
  getCategories,
  getProviders,
} from "../../ApiConnector"

export default {
  data() {
    return {
      product: {
        categoryNumber: null,
        providerNumber: null,
        defaultPlaceNumber: null,
        subCategoryNumber: null,
        name: "",
        number: "",
        unit: "",
        quantity: "",
        quantityThreshold: "",
        price: 0
      },
      providers: [],
      categories: [],
      places: []
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault()
      console.log(this.product);
      let {number, ...categoryData} = this.product
      if(number) {
        await editProduct(number, categoryData)
      }
      else {
        await createProduct(categoryData)
      }
    },
    onPlaceChange: function(e) {
      this.product.defaultPlaceNumber = e.target.value
    },
    onCategoryChange: function(e) {
      this.product.categoryNumber = e.target.value
    },
    onSubCategoryChange: function(e) {
      this.product.subCategoryNumber = e.target.value
    },
    onProviderChange: function(e) {
      this.product.providerNumber = e.target.value
    },
  },
  computed: {
    buttonLabel: function () {
      return this.product.number ? "Modifier" : "Ajouter"
    },
    selectedCategory: function() {
      let {categoryNumber} = this.product
      let {categories} = this
      console.log(categoryNumber);
      console.log(this.categories.find(c => c.number == categoryNumber));
      console.log(this.categories);
      return categories.find(c => c.number == categoryNumber)
    },
    subCategories: function() {
      console.log(this.selectedCategory);
      if(this.selectedCategory) {
        return this.selectedCategory.subCategories
      }
      else {
        return []
      }
    }
  },
  created: async function() {
    let {number} = this.$route.params
    this.product.number = number

    let res2 = await Promise.all([
      getCategories(),
      getProviders(),
      getPlaces()
    ])
    let data = await Promise.all(res2.map(r => r.json()))

    this.categories = data[0]
    this.providers = data[1]
    this.places = data[2]

    this.product.defaultPlaceNumber = this.places[0] && String(this.places[0].number)
    this.product.providerNumber = this.providers[0] && String(this.providers[0].number)
    this.product.categoryNumber = this.categories[0] && String(this.categories[0].number)
    this.product.subCategoryNumber = this.subCategories[0] && String(this.subCategories[0].number)

    if(number) {
      let res = await getProduct(number)
      let {defaultPlace, provider, category, subCategory, ...data} = await res.json()
      this.product = {
        ...this.product,
        defaultPlaceNumber: defaultPlace.number,
        providerNumber: provider.number,
        categoryNumber: category.number,
        subCategoryNumber: subCategory.number,
        ...data
      }
      console.log(this.product);
    }
  }
}
</script>

<style lang="css">
</style>
