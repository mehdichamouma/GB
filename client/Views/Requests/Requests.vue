<template lang="html">
  <request-list :rows="rows" v-on:refresh="refresh"></request-list>
</template>

<script>
import RequestList from "../RequestList.vue"
import {getRequests} from "../../ApiConnector.js"

export default {
  components: {
    'request-list': RequestList
  },
  data() {
    return {
      rows: []
    }
  },
  computed: {
    refresh: async function() {
      let res = await getRequests()
      this.rows = await res.json()
    }
  },
  created: async function() {
    await this.refresh()
  }
}
</script>

<style lang="css">
</style>
