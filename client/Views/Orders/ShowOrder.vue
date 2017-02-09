<template lang="html">

  <div class="row">
    <div class="col col-xs-12 col-md-5">
      <h4 v-if="order.status == 'ORDER_NEW'">
        Nouvelle commande
      </h4>
      <h4 v-if="order.status == 'ORDER_IN_PROCESS'">
        Commande #{{order.extNumber || 'N/A'}}
      </h4>
      <div class="row">
        <div class="col col-xs-12">
          <div class="x_panel">
            <div class="x_title">
              <h6>Informations commande</h6>
              <div class="clearfix"></div>
            </div>
            <div class="x_content">
            <dl class="dl-horizontal" >
                  <dt>Status</dt>
                  <dd><order-status :status="order.status"></order-status></dd>
                  <dt>Numéro</dt>
                  <dd>{{order.extNumber || 'N/A'}}</dd>
                  <dt>Date de la commande</dt>
                  <dd>{{order.orderDate}}</dd>
                  <dt>Date de livraison</dt>
                  <dd>{{order.deliveryDate}}</dd>
            </dl>
            <div class="ln_solid"></div>
            <dl class="dl-horizontal">
              <dt>Demandeur</dt>
              <dd>{{order.orderCreator.username}}</dd>
              <dt>Email</dt>
              <dd>{{order.orderCreator.email}}</dd>
            </dl>
            <div class="ln_solid"></div>
            <dl class="dl-horizontal" >
                  <dt>Total (HT)</dt>
                  <dd>{{floor(orderTotal, 2)}} €</dd>
                  <dt>Total taxes</dt>
                  <dd>{{floor(orderTotalTaxes, 2)}} €</dd>
                  <dt>Total (TTC)</dt>
                  <dd>{{floor(orderTotalWithTaxes, 2)}} €</dd>
            </dl>
          </div>
            </div>
          </div>
        </div>
      </div>
        <div class="col col-md-7 col-xs-12">
          <h4>
            Contenu de la commande
          </h4>
          <div class="table-responsive">
                          <table class="table table-striped jambo_table">
                            <thead>
                              <tr class="headings">
                                <th class="column-title">Produit </th>
                                <th class="column-title">Quantité </th>
                                <th class="column-title">Prix unitaire (HT) </th>
                                <th class="column-title">Total (HT) </th>
                                <th class="column-title">TVA </th>
                                <th class="column-title">Total (TTC) </th>
                                </th>
                              </tr>
                            </thead>

                            <tbody style="background-color: white;">
                              <tr v-for="(row, index) in rowsTable" :class="[index % 2 == 0 ? 'odd' : 'even', 'pointer']">
                                <td class=" ">{{row.productName}}</td>
                                <td class=" ">{{row.quantity}} </td>
                                <td class=" ">{{row.unitPrice}} €</td>
                                <td class=" ">{{row.totalPrice}} €</td>
                                <td class=" ">{{row.tva}} %</td>
                                <td class="a-right a-right ">{{row.totalPriceWithTaxes}} €</td>
                                </td>
                              </tr>
                            </tbody>
                          </table>
          </div>
          <div v-if="order.status == 'ORDER_DELIVERED'">
          <div class="ln_solid"></div>
          <h4>
            Livraison
          </h4>
          <div class="table-responsive">
                          <table class="table table-striped jambo_table">
                            <thead>
                              <tr class="headings">
                                <th class="column-title">Produit </th>
                                <th class="column-title">Quantité effective </th>
                                <th class="column-title">Lieu de stockage </th>
                                <th class="column-title">DLC </th>
                                </th>
                              </tr>
                            </thead>

                            <tbody style="background-color: white;">
                              <tr v-for="(row, index) in order.orderRows" :class="[index % 2 == 0 ? 'odd' : 'even', 'pointer']">
                                <td class=" ">{{row.product.name}}</td>
                                <td class=" ">{{row.effectiveQuantity}} </td>
                                <td class=" ">{{row.place.name}}</td>
                                <td class=" ">{{row.dlc}}</td>
                                </td>
                              </tr>
                            </tbody>
                          </table>
          </div>
          <div>
            <button v-on:click="updateDelivery" type="button" class="btn btn-warning">Modifier la livraison</button>
          </div>
        </div>
    </div>
    <div v-if="order.status == 'ORDER_NEW'" class="col col-xs-12">
      <h4>
        La commande est en cours de traitement ?
      </h4>
      <div class="x_panel">
        <div class="x_content">
          <div class="row">
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Entrez le numéro de commande </label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input v-model="order.extNumber" type="text" id="first-name" required="required" class="form-control">
              </div>
            </div>
          </div>
          <div class="ln_solid"></div>
          <div class="row">
            <button v-on:click="handleInProcess" type="submit" class="pull-right btn btn-success">Valider</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order.status == 'ORDER_IN_PROCESS'" class="col col-xs-12">
      <h4>
        La commande est arrivée ?
      </h4>
      <div class="x_panel">
        <div class="x_content">
          <div class="row">
            <div class="form-group col col-md-6 col-xs-12">
              <label >Date de livraison effective </label>
              <datepicker
                language="fr"
                v-model="order.effDeliveryDate"
                input-class="form-control gbstock_bg-white"
                class="form-group bg-info"
                placeholder="Date limite de conservation"
              ></datepicker>
              </div>
            </div>
          <div class="ln_solid"></div>
          <div v-for="row in order.orderRows"class="row">
            <h6>{{row.product.name}}</h6>
          <div  class="well">

            <form class="form-inline">
              <div class="form-group has-feedback">
                <label for="exampleInputName2">Quantité reçue</label>
                <input v-model="row.effectiveQuantity" type="text" class="form-control" id="exampleInputName2" placeholder="Quantité reçue">
                <span class="form-control-feedback right" >{{row.product.unit}}</span>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail2">Lieu de stockage</label>
                <select v-on:change="onPlaceChange(row, $event)" class="form-control">
                  <option
                    v-for="place in places"
                    :value="place.number"
                    :selected="(place.number == row.placeNumber) && 'selected'"
                  >
                  {{place.name}}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail2">DLC </label>
                <datepicker
                  language="fr"
                  v-model="row.dlc"
                  input-class="form-control gbstock_bg-white"
                  class="form-group"
                  placeholder="Date limite de conservation"
                ></datepicker>
              </div>
            </form>
          </div>
        </div>
        <div class="ln_solid"></div>
        <div class="row">
          <button v-on:click="handleDelivered" type="submit" class="pull-right btn btn-info">Valider</button>
        </div>
        </div>
      </div>

    </div>
    <div v-if="order.status == 'ORDER_IN_PROCESS'" class="col col-xs-12">
      <h4>
        La commande est annulée ?
      </h4>
      <div class="x_panel">
        <div class="x_content">
          <div class="row">
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Précisez le motif</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <textarea class="resizable_textarea form-control" v-model="order.comment" rows="4" placeholder=""></textarea>
              </div>
            </div>
          </div>
        <div class="ln_solid"></div>
        <div class="row">
          <button v-on:click="handleCanceled" type="submit" class="pull-right btn btn-danger">Annuler la commande</button>
        </div>
        </div>
      </div>

    </div>
    </div>

</template>

<script>
import {
  getOrder,
  getPlaces,
  updateOrder
} from "../../ApiConnector"
import Datepicker from "vuejs-datepicker"
import OrderStatusBadge from "./OrderStatusBadge.vue"
import {floor} from "lodash"

export default {
  components: {
    Datepicker,
    "order-status": OrderStatusBadge
  },
  data() {
    return {
      order: {
        orderRows: [],
        orderCreator: {},
        provider: {}
      },
      places: []
    }
  },
  methods: {
    updateDelivery: function() {
      this.order.status = "ORDER_IN_PROCESS"
    },
    handleInProcess: async function(e) {
      e.preventDefault()
      let number = this.order.number
      await updateOrder(number, {
        ...this.order,
        status: 'ORDER_IN_PROCESS',
      })
      await this.refresh()
    },
    handleCanceled: async function(e) {
      e.preventDefault()
      let number = this.order.number
      await updateOrder(number, {
        ...this.order,
        status: 'ORDER_CANCELED',
      })
      await this.refresh()
    },
    refresh: async function() {
      let {number} = this.$route.params
      let res = await getOrder(number)
      let order = await res.json()
      if(order.status == 'ORDER_IN_PROCESS') {
        order.orderRows = order.orderRows.map(o => ({
          ...o,
          effectiveQuantity: o.quantity,
          placeNumber: o.product.defaultPlace.number
        }))
      }
      this.order = order
      let res2 = await Promise.all([
        getPlaces()
      ])
      let data = await Promise.all(res2.map(r => r.json()))
      this.places = data[0]
    },
    onPlaceChange: function(row, event) {
      event.preventDefault()
      row.placeNumber = event.target.value
    },
    handleDelivered: async function(e) {
      e.preventDefault()
      console.log(this.order);
      let number = this.order.number
      await updateOrder(number, {
        ...this.order,
        status: 'ORDER_DELIVERED',
      })
      await this.refresh()
    },
    floor
  },
  computed: {
    rowsTable: function() {
      return this.order.orderRows.map(row => {
        let totalPrice = row.unitPrice * row.quantity
        let totalPriceWithTaxes = floor(
          totalPrice * (1 + (row.effectiveTVA/100))
          , 2
        )
        return {
          productName: row.product.name,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          totalPrice,
          totalPriceWithTaxes,
          tva: row.effectiveTVA
        }
      })
    },
    orderTotal: function() {
      return this.rowsTable.reduce((total, row) => total + row.totalPrice, 0)
    },
    orderTotalTaxes: function() {
      return this.rowsTable.reduce((taxes, row) => taxes + (row.totalPrice * row.tva / 100), 0)
    },
    orderTotalWithTaxes: function() {
      return this.orderTotal + this.orderTotalTaxes
    }
  },
  created: async function() {
    await this.refresh()

  },
  updated: function() {
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
    })
  }
}
</script>

<style lang="css">
.gbstock_bg-white {
  background-color: #FFFFFF !important;
}
</style>
