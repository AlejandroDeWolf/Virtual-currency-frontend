<script setup>
import { ref } from 'vue'
import { config } from '../../config/config'

let username = ref('');
let firstname = ref('');
let lastname = ref('');
let email = ref('');
let password = ref('');
let error = ref('');
let errorMessage = ref('');

function Signup(e) {
    e.preventDefault();
    fetch(config.url + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
        })
    }).then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.status === "success") {
                window.location.href = '/';
            } else {
                error.value = json.status;
                errorMessage.value = json.message;
            }
        })
}

</script>

<template>
    <div class="card">
        <h1>Sign up</h1>

        <div v-if="error == 'error'" class="error">
            <p class="error__message" >{{ errorMessage }}</p>
        </div>

        <form action="" class="form">
            <input type="text" placeholder="Username" v-model="username" class="form__input">
            <input type="text" placeholder="Firstname" v-model="firstname" class="form__input">
            <input type="text" placeholder="Lastname" v-model="lastname" class="form__input">
            <input type="text" placeholder="Email" v-model="email" class="form__input">
            <input type="password" placeholder="Password" v-model="password" class="form__input">
            <input type="submit" @click="Signup" value="Submit" class="btn">
        </form>

        <router-link to="/" class="nav__link">Login here</router-link>
    </div>
</template>

