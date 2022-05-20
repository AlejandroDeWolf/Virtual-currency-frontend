<script setup>
import { ref, onMounted } from 'vue'
import config from '../../config/config'

let sender = ref('');
let sendAmount = ref('');
let receiver = ref('');
let reason = ref('');

function addTransaction() {
    let token = localStorage.getItem("token");

    fetch(config.url + "/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            amount: sendAmount.value,
            sender: sender.value,
            receiver: receiver.value,
            reason: reason.value,
        })
    }).then(res => res.json())
        .then(json => {
            console.log(json);
            window.location.href = '/dashboard';

        }).catch(err => {
            console.log(err)
        })
}


</script>

<template>
    <div class="card">
        <h3>Maak een transactie</h3>
        <div>
            <h2>Naam</h2>
            <input type="text" v-model="receiver" >
        </div>
        <div>
            <h2>Amount</h2>
            <input type="text" v-model="sendAmount" >
        </div>
        <div>
            <h2>Beschrijving</h2>
            <input type="text" v-model="reason" >
        </div>
        <div>
            <input type="submit" value="Verzenden" @click="addTransaction" class="btn">
        </div>
    </div>
</template>