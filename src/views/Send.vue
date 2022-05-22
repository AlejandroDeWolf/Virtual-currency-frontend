<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'
import Navigation from '../components/Navigation.vue'


let sender = ref('');
let receiver = ref('');
let sendAmount = ref('');
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
            sender: sender.value,
            receiver: receiver.value,
            amount: sendAmount.value,
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
        <h2>Maak een transactie</h2>
        <div>
            <h3>Naam ontvanger</h3>
            <input type="text" v-model="receiver" class="form__input">
        </div>
        <div>
            <h3>Bedrag</h3>
            <input type="text" v-model="sendAmount" class="form__input">
        </div>
        <div>
            <h3>Beschrijving</h3>
            <input type="text" v-model="reason" class="form__input">
        </div>
        <div>
            <input type="submit" value="Verzenden" @click="addTransaction" class="btn">
        </div>
    </div>

    <Navigation />
</template>