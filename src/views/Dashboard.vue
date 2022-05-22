<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'

let amount = ref('');
let firstname = ref('');
let lastname = ref('');

let type = ref('');
let transactions = ref('');
let sender = ref('');

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
            //amount = json.userAmount[0].balance;
            console.log(json);
            amount.value = json.userAmount[0].balance;
            firstname.value = json.userAmount[0].firstname;
            lastname.value = json.userAmount[0].lastname;
            console.log(amount);

        })
}

//get transaction details from one by id
function Details() {
    let token = localStorage.getItem("token");
    let id = transactions.value[0]._id;
    //console.log(transactions.value[0]._id)
    fetch(config.url + "/transactions/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    }).then(res => res.json())
        .then(json => {
            console.log(json);

        })
}

onMounted(() => {
    getUser();
})
</script>

<template>
    <div class="card">
        <h3 class="user">{{ firstname + " " + lastname }}</h3>

        <div class="balance">
            <h2 class="balance__amount"> {{ amount }}</h2>
            <p class="balance__text">credits</p>
        </div>

        <div class="btn btn--dashboard">
            <router-link to="/send">Credits verzenden</router-link>
        </div>

        <div class="btn btn--dashboard">
            <router-link to="/transactions">Bekijk transacties</router-link>
        </div>
    </div>
</template>