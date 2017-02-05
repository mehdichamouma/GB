<template lang="html">
  <div class="login">
    <div>
      <div class="login_wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.login {
  height:100vh;
  position: relative;
  margin: 0;
}

.login_wrapper {
  margin-top: 0;
}
</style>
