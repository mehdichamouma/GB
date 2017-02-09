<template lang="html">
  <span :class="['label', statusMapper(status).labelType]">{{statusMapper(status).name}}</span>
</template>

<script>

let statusMapper = {
   "ORDER_NEW": {
     name: "Nouvelle",
     labelType: "label-primary"
   },
   "ORDER_CANCELED": {
     name: "Annulée",
     labelType: "label-warning"
   },
   "ORDER_DENIED": {
     name: "Refusée",
     labelType: "label-danger"
   },
   "ORDER_IN_PROCESS": {
     name: "En traitement",
     labelType: "label-info"
   },
   "ORDER_DELIVERED": {
     name: "Délivrée",
     labelType: "label-success"
   }
}
export default {
  props: ['status'],
  methods: {
    statusMapper: function (status) {
      return statusMapper[status] || {}
    }
  },

}
</script>

<style lang="css">
</style>
