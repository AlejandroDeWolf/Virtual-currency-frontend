<script setup>
import { ref } from 'vue'
let firstname = ref('');
let lastname = ref('');
let email = ref('');
let password = ref('');

function Signup(e) {
e.preventDefault();
    fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
        })
    }).then(res => res.json())
    .then(json => {
        console.log(json);
    })
}

</script>

<template>
    <div class="card">
        <h1>Sign up</h1>

        <form action="">
            <input type="text" placeholder="Firstname" v-model="firstname" class="inputField">
            <input type="text" placeholder="Lastname" v-model="lastname" class="inputField">
            <input type="text" placeholder="Email" v-model="email" class="inputField">
            <input type="password" placeholder="Password" v-model="password" class="inputField">
            <input type="submit" @click="Signup" value="Submit" class="btn">
        </form>

        <router-link to="/" class="link">Login here</router-link>
    </div>
</template>

