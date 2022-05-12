<script setup>
import { ref } from 'vue'
import config from '../../config/config'

let email = ref('');
let password = ref('');

function Login(e) {
e.preventDefault();
    fetch("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        })
    })
}

</script>

<template>
    <div class="card">
        <h1>Login</h1>

        <form action="">
            <input type="text" placeholder="Email" v-model="email" class="inputField">
            <input type="password" placeholder="Password" class="inputField">
            <input type="submit" @click="Login" value="Submit" class="btn">
        </form>

        <router-link to="/signup" class="link">Sign up here</router-link>
    </div>
</template>