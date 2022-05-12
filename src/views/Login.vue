<script setup>
import { ref } from 'vue'


</script>

<template>
    <div class="card">
        <h1>Login</h1>

        <form action="">
            <input type="text" placeholder="Email" v-model="email" class="inputField">
            <input type="password" placeholder="Password" class="inputField">
            <input type="submit" @click="addMessage" value="Submit" class="btn">
        </form>

        <router-link to="/signup" class="link">Sign up here</router-link>
    </div>
</template>