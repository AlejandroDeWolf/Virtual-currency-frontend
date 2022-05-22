<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'
import Navigation from '../components/Navigation.vue'


let amount = ref('');
let firstname = ref('');
let lastname = ref('');
let error = ref('');
let errorMessage = ref('');

function getUser() {
    let token = localStorage.getItem("token");

    fetch(config.url + "/users/amount", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    }).then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.status === "success") {
                amount.value = json.userAmount[0].balance;
                firstname.value = json.userAmount[0].firstname;
                lastname.value = json.userAmount[0].lastname;
            } else {
                error.value = json.status;
                errorMessage.value = json.message;
            }

        })
}


onMounted(() => {
    getUser();
})
</script>

<template>
    <div class="card">

        <div v-if="error === 'error'" class="error">
            <p class="error__message" >{{ errorMessage }}</p>
        </div>

        <h3 class="user">{{ firstname + " " + lastname }}</h3>

        <div class="balance">
            <h2 class="balance__amount"> {{ amount }}</h2>
            <p class="balance__text">credits</p>
        </div>

        <div>
            <router-link to="/leaderboard" class="link">Leaderboard &#8594;</router-link>
        </div>
    </div>

    <Navigation />
</template>