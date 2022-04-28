<script setup>
import { ref } from 'vue'


</script>

<template>
  <div>
        <h1>Login</h1>
        <input type="text" placeholder="Username" v-model="username">
        <input type="text" placeholder="Email" v-model="message">
        <input type="password" placeholder="Password">
        <input type="submit" @click="addMessage" value="Login">
    </div>
</template>

<style scoped>

</style>
