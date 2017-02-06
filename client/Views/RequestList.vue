<template lang="html">
  <table class="table table-striped jambo_table">
    <thead>
    <tr class="headings">
    <th class="column-title">Demandeur </th>
    <th class="column-title">Date de la demande </th>
    <th class="column-title">Quantité souhaité</th>
    <th class="column-title">Status </th>
    <th class="column-title">Action </th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="row in requests" class="even pointer">
      <td class=" ">{{row.requester.username}}</td>
      <td class=" ">{{row.requestDate}}</td>
      <td class=" ">{{row.quantity}} </td>
      <td >
        <span v-bind:class="['label', row.status.labelClass]">
          {{row.status.name}}
        </span>
      </td>
      <td class=" ">
        <div v-if="row.actions.length" class="btn-group">
          <button type="button" class="btn btn-danger">Action</button>
          <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li v-for="action in row.actions" v-on:click="handleAction(action)"><a href="#">{{action}}</a></li>
          </ul>
        </div>

      </td>
    </tr>

    </tbody>
  </table>
</template>

<script>
let statusMapper = {
  "REQUEST_REFUSED": {
    name: "Refusée",
    labelClass: "label-danger",
  },
  "REQUEST_COMPLETED": {
    name: "Terminée",
    labelClass: "label-primary",
  },
  "REQUEST_CANCELED": {
    name: "Annulée",
    labelClass: "label-danger",
  },
  "REQUEST_PENDING": {
    name: "En attente",
    labelClass: "label-warning",
  },
  "REQUEST_ACCEPTED": {
    name: "Acceptée",
    labelClass: "label-success",
  },
  "REQUEST_PROCESSED": {
    name: "En cours de traitement",
    labelClass: "label-info",
  },
}


export default {
  props: ["rows", "actionEnabled"],
  methods: {
    handleAction(action) {
      console.log(action);
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
              actions = ['REQUEST_ACCEPTED', 'REQUEST_REFUSED']
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
              actions.push("REQUEST_REFUSED")
              editEnabled = true
              break;
            case "REQUEST_PROCESSED":
              actions.push("REQUEST_CANCELED")
              editEnabled = true
            default:
          }
        }
        if(isOwner) {
          switch (row.status) {
            case "REQUEST_PENDING":
              actions.push("REQUEST_PROCESSED")
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
          actions,
          status: statusMapper[row.status] || {},
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
