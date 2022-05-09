<script setup>
import { ref } from 'vue'


</script>

<template>
  <div class="card">
    <h1>Sign in</h1>

    <form action="">
      <input type="text" placeholder="Email" v-model="email" class="formInput">
      <input type="password" placeholder="Password" class="formInput">
      <input type="submit" @click="addMessage" value="Submit" class="btn">
    </form>

    <a href="#" class="link">Register here</a>
  </div>
</template>

