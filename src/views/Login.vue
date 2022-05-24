<script setup>
import { ref } from 'vue'
import { config } from '../../config/config'

let email = ref('');
let password = ref('');
let error = ref('');
let errorMessage = ref('');

function Login(e) {
    e.preventDefault();
    fetch(config.url + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        })
    }).then(res => res.json())
        .then(json => {
            if (json.status === "success") {
                let token = json.token;
                localStorage.setItem("token", token);
                localStorage.setItem("username", json.username)
                window.location.href = '/dashboard';
            } else {
                error.value = json.status;
                errorMessage.value = json.message;
            }
            console.log(json);
        })
}

</script>

<template>
    <div class="card">
        <h1>Login</h1>

        <div v-if="error === 'error'" class="error">
            <p class="error__message" >{{ errorMessage }}</p>
        </div>

        <form action="" class="form">
            <input type="text" placeholder="Email" v-model="email" class="form__input">
            <input type="password" placeholder="Password" class="form__input" v-model="password">
            <input type="submit" @click="Login" value="Submit" class="btn">
        </form>

        <router-link to="/signup" class="nav__link">Sign up here</router-link>
    </div>
</template>