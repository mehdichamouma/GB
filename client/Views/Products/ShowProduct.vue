<template lang="html">
  <div class="row">
                <div class="col-md-12">
                  <div class="x_panel">
                    <div class="x_title">
                      <h2>{{product.name}}</h2>
                      <div class="clearfix"></div>
                    </div>

                    <div class="x_content">

                      <div class="col-md-9 col-sm-9 col-xs-12">

                        <ul class="stats-overview">
                          <li>
                            <span class="name"> Quantité en stock </span>
                            <span class="value text-success"> {{product.quantity}} {{product.unit}} </span>
                          </li>
                          <li>
                            <span class="name"> Demande d'achat en cours </span>
                            <span class="value text-success"> 120 </span>
                          </li>
                          <li class="hidden-phone">
                            <span class="name"> Prix (par {{product.unit}}) </span>
                            <span class="value text-success"> {{product.price}} </span>
                          </li>
                        </ul>
                        <br>


                        <div>
                          <h4>Historique des commandes</h4>
                          <table class="table table-striped jambo_table">
                          <thead>
                          <tr class="headings">
                          <th class="column-title">#Commande </th>
                          <th class="column-title">Status</th>
                          <th class="column-title">Date de livraison</th>
                          <th class="column-title">Quantité </th>
                          <th class="column-title">Date limite de conservation </th>
                          <th class="column-title">Rangement </th>
                          </tr>
                          </thead>

                          <tbody>

                          <tr v-for="row in product.stockEntries" class="even pointer">
                            <td class=" ">{{row.order.number}}</td>
                            <td class=" "><orderstatus :status="row.order.status"></orderstatus></td>
                            <td class=" ">{{row.order.deliveryDate}} </td>
                            <td class=" ">{{row.quantity}} </td>
                            <td class=" ">{{row.dlc || "N/A"}}</td>
                            <td class=" ">{{(row.place && row.place.name) || "N/A"}} </td>
                          </tr>

                          </tbody>
                          </table>
                        </div>


                      </div>

                      <!-- start project-detail sidebar -->
                      <div class="col-md-3 col-sm-3 col-xs-12">

                        <section class="panel">

                          <div class="x_title">
                            <h2>Fiche produit</h2>
                            <div class="clearfix"></div>
                          </div>
                          <div class="panel-body">
                            <h3 class="green"> {{product.name}}</h3>
                            <p>{{product.description}}</p>
                            <br>

                            <div class="project_detail">

                              <p class="title">Categorie</p>
                              <p>{{product.category.name}}</p>
                              <p class="title">Sous-Categorie</p>
                              <p>{{product.subCategory.name}}</p>
                              <p class="title">Fournisseur</p>
                              <p>{{product.provider.name}}</p>
                              <p class="title">Prix unitaire</p>
                              <p>{{product.price}}€</p>
                              <p class="title">Quantité en stock</p>
                              <p>{{product.quantity}} {{product.unit}}</p>
                              <p class="title">Quantité d'alerte</p>
                              <p>{{product.thresholdQuantity}} {{product.unit}}</p>
                            </div>

                            <br>
                            <h5>Fichier attachés</h5>
                            <ul class="list-unstyled project_files">
                              <li><a href=""><i class="fa fa-file-word-o"></i> Functional-requirements.docx</a>
                              </li>
                              <li><a href=""><i class="fa fa-file-pdf-o"></i> UAT.pdf</a>
                              </li>
                              <li><a href=""><i class="fa fa-mail-forward"></i> Email-from-flatbal.mln</a>
                              </li>
                              <li><a href=""><i class="fa fa-picture-o"></i> Logo.png</a>
                              </li>
                              <li><a href=""><i class="fa fa-file-word-o"></i> Contract-10_12_2014.docx</a>
                              </li>
                            </ul>
                            <br>

                            <div class="text-center mtop20">
                              <a href="#" class="btn btn-sm btn-primary">Add files</a>
                              <a href="#" class="btn btn-sm btn-warning">Report contact</a>
                            </div>
                          </div>

                        </section>

                      </div>
                      <!-- end project-detail sidebar -->

                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="x_panel">
                    <div class="x_title">
                      <h2>Demandes d'achat</h2>
                      <div class="clearfix"></div>
                    </div>

                    <div class="x_content">
                      <div class="row">
                        <div class="col-md-12">
                          <request-list
                            :rows="product.requests"
                            :actionEnabled="isProductOwner"
                            v-on:change="refresh"
                          >
                          </request-list>
                        </div>
                      </div>
                      <div class="row">
                      <div class="col-md-12">
                        <h4>Ajouter une demande d'achat</h4>
                        <form class="form-inline">
                            <div class="form-group">

                              <div class="form-group has-feedback">
                                <label for="ex3">Quantité souhaité</label>
                                      <input v-model="newRequest.quantity" required="required" type="text" class="form-control" id="inputSuccess3" placeholder="Quantité souhaitée">
                                      <span class="form-control-feedback right" >{{product.unit}}</span>
                              </div>
                            </div>
                            <button type="submit" class="btn btn-default" v-on:click="handleNewRequest">Effectuer la demande d'achat</button>
                          </form>
                        <div class="col-md-12">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
</template>

<script>
import {
  getProduct,
  createRequest
} from "../../ApiConnector"
import RequestList from "../RequestList.vue"
import Orderstatus from "../Orders/OrderStatusBadge.vue"

export default {
  components: {
    "request-list": RequestList,
    Orderstatus
  },
  data() {
    return {
      product: {
        number: null,
        name: "",
        price: 0,
        unit: "",
        thresholdQuantity: 0,
        provider: {},
        category: {},
        subCategory: {},
        defaultPlace: {},
        requests: []
      },
      newRequest: {
        quantity: null
      }
    }
  },
  methods: {
    handleNewRequest: async function(e) {
      e.preventDefault()
      await createRequest(this.product.number, {
        quantity: this.newRequest.quantity
      })
      await this.refresh()
    },
    refresh: async function() {
      let {number} = this.$route.params
      if(number) {
        this.product.number = number
        let res = await getProduct(number)
        this.product = await res.json()
      }
    }
  },
  computed: {
    isProductOwner: function() {
      return true
    }
  },
  created: async function () {
    await this.refresh()
  }
}
</script>

<style lang="css">
</style>
