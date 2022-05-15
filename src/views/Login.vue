<script setup>
import { ref } from 'vue'
import config from '../../config/config'

let email = ref('');
let password = ref('');

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
            if(json.status === "success"){
                let token = json.token;
                localStorage.setItem("token", token);
                window.location.href = '/dashboard';
            }
            console.log(json);
        })
}

</script>

<template>
    <div class="card">
        <h1>Login</h1>

        <form action="">
            <input type="text" placeholder="Email" v-model="email" class="inputField">
            <input type="password" placeholder="Password" class="inputField" v-model="password">
            <input type="submit" @click="Login" value="Submit" class="btn">
        </form>

        <router-link to="/signup" class="link">Sign up here</router-link>
    </div>
</template>