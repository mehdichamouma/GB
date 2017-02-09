<template lang="html">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2 >
            Créer une nouvelle commande
          </h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <form class="row form-horizontal form-inline form-label-left">
            <div class="form-group">
              <label class="control-label">Fournisseur</label>
                <select
                  v-on:change="onProviderChange"
                  class="form-control"
                  :disabled="selectedProvider"
                >
                  <option
                    v-for="provider in providers"
                    :value="provider.number"
                    :selected="(provider.number == product.providerNumber) && 'selected'"
                  >
                  {{provider.name}}
                  </option>
                </select>
            </div>
            <div class="form-group">
                <button
                  :disabled="selectedProvider"
                  type="submit"
                  v-on:click="onProviderSubmit"
                  class="btn btn-success">Valider</button>
            </div>
            </form>


        </div>
      </div>
    </div>
    <div v-if="selectedProvider" class="col-md-12 col-sm-12 col-xs-12">
          <h4 >
            Contenu de la commande
          </h4>
          <div v-for="(row, index) in orderRows" class="x_panel">
            <div class="x_title">
              <h2 v-if="!row.requests">
                Ajouter un produit
              </h2>
              <h2 v-else>
                {{row.product.name}}
              </h2>
              <ul class="nav navbar-right panel_toolbox" style="min-width: 0px;">
                <li>
                  <a v-on:click="deleteRow(index)" class="close-link"><i class="fa fa-close"></i></a>
                </li>
              </ul>

              <div class="clearfix"></div>
            </div>
            <div class="x_content">
              <form class="form-horizontal">
                <div v-if="!row.requests" class="form-group">
                  <label class="control-label" for="first-name">Produit <span class="required">*</span>
                  </label>
                  <div class="form-group">
                    <input
                      autocomplete="off"
                      data-provide="typeahead"
                      type="text"
                      id="first-name"
                      required="required"
                      class="typeahead form-control"

                    >
                  </div>
                </div>
                <div v-else>
                  <h6 class="text-warning">Ajouté automatiquement à partir des demandes d'achats</h6>
                  <table class="table table-hover text-warning">
                      <thead>
                        <tr>
                          <th>Demandeur</th>
                          <th>Quantité</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="req in row.requests">
                          <td>{{req.requester.username}}</td>
                          <td>{{req.quantity}}</td>
                          <td>{{req.status}}</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                <div class="form-group">
                  <label class="control-label" for="first-name">Quantité <span class="required">*</span>
                  </label>
                  <div class="form-group has-feedback">
                          <input v-model="row.quantity" type="text" class="form-control" id="inputSuccess3" placeholder="Prix">
                          <span class="form-control-feedback right" aria-hidden="true">{{row.product && row.product.unit}}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="first-name">TVA <span class="required">*</span>
                  </label>
                  <div class="form-group has-feedback">
                          <input v-model="row.effectiveTVA" type="text" class="form-control" id="inputSuccess3" placeholder="TVA">
                          <span class="form-control-feedback right" aria-hidden="true">%</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="first-name">Prix <span class="required">*</span>
                  </label>
                  <div class="form-group has-feedback">
                          <input v-model="row.price" type="text" class="form-control" id="inputSuccess3" placeholder="Prix">
                          <span class="form-control-feedback right" aria-hidden="true">€</span>
                  </div>
                </div>
              </form>
            </div>

        </div>
        <div class="form-group">
          <div class="form-group">
            <button type="submit" v-on:click="insertOrderRow" class="btn btn-success">+ Nouvelle ligne</button>
          </div>
        </div>

    </div>

    <div v-if="selectedProvider" class="col-md-12 col-sm-12 col-xs-12">
      <h4 >
        Récapitulatif
      </h4>
      <div class="x_panel">
        <div class="x_content">

          <div class="row">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Date de livraison</label>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="control-group">
                <div class="controls">
                  <div class="col-md-11 xdisplay_inputx form-group has-feedback">
                    <input
                      type="text"
                      class="form-control has-feedback-left"
                      id="deliveryDate"
                      placeholder="Date de livraison"
                      aria-describedby="inputSuccess2Status4"
                      value=""
                    >
                    <span class="fa fa-calendar-o form-control-feedback left" aria-hidden="true"></span>
                    <span id="inputSuccess2Status4" class="sr-only">(success)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="row">
            <div class="col-xs-12">
              <br>
              Prix total: {{totalPrice}} €
              <br>
              Fournisseur: {{selectedProvider && selectedProvider.name}}


          </div>
          <div class="form-group col-xs-12">
            <div class="form-group">
              <button type="submit" v-on:click="handleSubmit" class="btn btn-success">Envoyer</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  createOrder,
  editProduct,
  createProduct,
  getProduct,
  getPlaces,
  getCategories,
  getProviders,
  getProducts,
  getRequests
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
      orderRows: [
      ],
      testValue: null,
      test: [{id: "someId1", name: "Display name 1"},
            {id: "someId2", name: "Display name 2"}],
      providers: [],
      currentProvider: null,
      categories: [],
      places: [],
      products: [],
      deliveryDate: null
    }
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault()
      let rows = this.orderRows.filter(o => o.product)
      .map(o => {
        return {
          productNumber: o.product.number,
          quantity: parseFloat(o.quantity),
          unitPrice: o.price
        }
      })
      let order = {
        orderRows: rows,
        deliveryDate: this.deliveryDate,
      }
      console.log(order);
      let res = await createOrder(order)
      let d = await res.json()
      console.log(d);
      this.$root.router.push({
        name: 'showOrder',
        params: {
          number: d.number
        }
      })
    },

    onProviderChange: function(e) {
      this.currentProvider = e.target.value
    },
    onProviderSubmit: async function() {
      let self = this
      let res = await getProducts()
      let products = await res.json()
      this.products = products
      this.product.providerNumber = this.currentProvider
      this.orderRows = this.requests
      .filter(r => r.product.provider.number == this.product.providerNumber)
      .filter(r => r.status == 'REQUEST_PENDING')
      .reduce((rows, r) => {
        let index = rows.findIndex(row => r.product.number == row.product.number)
        if(index == -1) {
          let product = self.getProducts().find(p => p.number == r.product.number)
          rows.push({
            requests: [],
            quantity: 0,
            product,
            effectiveTVA: product.tva,
            price: product.price
          })
          index = rows.length - 1
        }
        rows[index].requests.push(r)
        rows[index].quantity = rows[index].quantity + r.quantity
        return rows
      }, [])
    },
    getProducts: function(...args) {
      return this.products
      .filter(p => p.provider && p.provider.number == this.currentProvider)
      .filter(p => !this.orderRows.find(o => o.product && o.product.number == p.number))
      .map(p => ({
        productName: p.name,
        name: `#${p.number} - ${p.name}`,
        number: p.number,
        unit: p.unit,
        price: p.price,
        tva: p.tva
      }))
    },
    displayText: function(...args) {
      console.log(args);
    },
    insertOrderRow: function() {
      this.orderRows.push({
        product: null,
        quantity: 0,
        price: 0
      })
    },
    deleteRow: function(index) {
      console.log(index);
      this.orderRows = [
        ...this.orderRows.slice(0, index),
        ...this.orderRows.slice(index + 1)
      ]
    }
  },
  computed: {
    selectedProvider: function() {
      let {providerNumber} = this.product
      let {providers} = this
      return providers.find(p => p.number == providerNumber)
    },
    totalPrice: function() {
      return this.orderRows.reduce((total, row) => (row.price * row.quantity) + total, 0)
    }
  },
  created: async function() {
    let res2 = await Promise.all([
      getCategories(),
      getProviders(),
      getPlaces(),
      getRequests()
    ])
    let data = await Promise.all(res2.map(r => r.json()))

    this.categories = data[0]
    this.providers = data[1]
    this.places = data[2]
    this.requests = data[3]

    if(this.providers[0]) {
      this.currentProvider = this.providers[0].number
    }
    this.insertOrderRow()


  },
  updated: function() {
    console.log(123);
    let self = this
    $('input.typeahead').each(function(index) {
      console.log(index);
      $(this).typeahead({
        source: (query, cb) => {
          cb(self.getProducts())
        },
        fitToElement: true,
        afterSelect: (item) => {
          console.log(self.orderRows, index);
          self.orderRows[index].product = item
          self.orderRows[index].price = item.price
          self.orderRows[index].effectiveTVA = item.tva
        }
      })
    })
    $("#deliveryDate").daterangepicker({
      singleDatePicker: true,
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
    }, (start) => {
      console.log(start.toDate());
      this.deliveryDate = start.toDate()
    });
    $("#deliveryDate").on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
    });
    $("#deliveryDate").on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY'));
  });
  }
}
</script>

<style lang="css">
</style>
