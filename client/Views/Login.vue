<template lang="html">
    <div class="animate form login_form">
      <section class="login_content">
        <form>
          <h1>Login</h1>
          <div>
            <input type="text" class="form-control" placeholder="Username" required="" v-model="email"/>
          </div>
          <div>
            <input type="password" class="form-control" placeholder="Password" required="" v-model="password"/>
          </div>
          <div>
            <a class="btn btn-default submit" v-on:click="doLogin">Se connecter</a>
          </div>

          <div class="clearfix"></div>

          <div class="separator">

            <div class="clearfix"></div>
            <br />

            <div>
              <h1><i class="fa fa-paw"></i> </h1>
              <p>©2016 Tous droits réservés</p>
            </div>
          </div>
        </form>
      </section>


    </div>
</template>

<script>

import {authenticate} from "../ApiConnector"

export default {
  data() {
    return {
      error: null,
      email: null,
      password: null
    }
  },
  methods: {
    doLogin: async function(e) {
      let self = this
      try {
        e.preventDefault()
        let res = await authenticate(this.email, this.password)
        let {token} = await res.json()
        console.log(token);
        this.$root.store.setUserToken(token)
        this.$router.push({name: 'home'})
      }
      catch(e) {
        console.error(e);
        this.error = "wrong email and password"
      }
    }
  }
}
</script>

<style lang="css">
</style>
