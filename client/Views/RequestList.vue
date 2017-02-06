<template lang="html">
  <table class="table table-striped jambo_table">
    <thead>
    <tr class="headings">
    <th class="column-title">Demandeur </th>
    <th class="column-title">Produit </th>
    <th class="column-title">Date de la demande </th>
    <th class="column-title">Quantité souhaité</th>
    <th class="column-title">Status </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="row in requests" class="even pointer">
      <td class=" ">{{row.requester.username}}</td>
      <td class=" ">{{row.product.name}}</td>
      <td class=" ">{{row.requestDate}}</td>
      <td class=" ">{{row.quantity}} </td>
      <td class=" ">
        <div  class="btn-group">

          <button  type="button" v-bind:class="['btn', row.actions.length && 'dropdown-toggle', row.status.labelClass]" data-toggle="dropdown" aria-expanded="false">
            {{row.status.name}} <span v-if="row.actions.length" class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul v-if="row.actions.length" class="dropdown-menu" role="menu">
            <li v-for="action in row.actions" ><a v-on:click="handleAction(row, action.value)">{{action.display}}</a></li>
          </ul>
        </div>

      </td>
    </tr>

    </tbody>
  </table>
</template>

<script>

import {updateRequest} from "../ApiConnector"

let statusMapper = {
  "REQUEST_REFUSED": {
    name: "Refusée",
    labelClass: "btn-danger",
    action: "Refuser la requête"
  },
  "REQUEST_COMPLETED": {
    name: "Terminée",
    labelClass: "btn-primary",
    action: "Terminer la requête"
  },
  "REQUEST_CANCELED": {
    name: "Annulée",
    labelClass: "btn-danger",
    action: "Annuler la requête"
  },
  "REQUEST_PENDING": {
    name: "En attente",
    labelClass: "btn-warning",
    action: "Mettre la requête en attente"
  },
  "REQUEST_ACCEPTED": {
    name: "Acceptée",
    labelClass: "btn-success",
    action: "Accepter la requête"
  },
  "REQUEST_PROCESSED": {
    name: "En cours de traitement",
    labelClass: "btn-info",
    action: "Traiter la requête"
  },
}


export default {
  props: ["rows", "actionEnabled"],
  methods: {
    handleAction: async function(row, action) {
      console.log(action);
      await updateRequest(row.number, {
        quantity: row.quantity,
        status: action
      })
      this.$emit('change')
    }
  },
  computed: {
    requests: function() {
      console.log(this.props);
      let isAdmin = true, isOwner = true

      return this.rows.map(row => {
        let actions = [], editEnabled = false
        if(this.actionEnabled) {
          switch (row.status) {
            case "REQUEST_REFUSED":
            case "REQUEST_COMPLETED":
            case "REQUEST_CANCELED":
            case "REQUEST_PROCESSED":
              actions = []
              editEnabled = false
              break;
            case "REQUEST_PENDING":
              actions.push('REQUEST_ACCEPTED')
              !isOwner && actions.push('REQUEST_REFUSED')
              editEnabled = true
              break;
            case "REQUEST_ACCEPTED":
              actions = ['REQUEST_CANCELED']
              break;
          }
        }
        if(isAdmin) {
          switch (row.status) {
            case "REQUEST_ACCEPTED":
              actions.push("REQUEST_PROCESSED")
              !isOwner && actions.push("REQUEST_REFUSED")
              editEnabled = true
              break;
            case "REQUEST_PROCESSED":
              actions.push("REQUEST_CANCELED")
              editEnabled = true
              break;
            default:
          }
        }
        if(isOwner) {
          switch (row.status) {
            case "REQUEST_PENDING":
              actions.push("REQUEST_CANCELED")
              editEnabled = true
              break;
            case "REQUEST_PROCESSED":
              actions.push("REQUEST_COMPLETED")
            default:
          }
        }
        return {
          ...row,
          actions: actions.map(value => ({
            value,
            display: statusMapper[value] && statusMapper[value].action
          })),
          status: statusMapper[row.status] || {},
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
