<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'
import Navigation from '../components/Navigation.vue'


let sender = ref('');
let receiver = ref('');
let sendAmount = ref('');
let reason = ref('');
let error = ref('');
let errorMessage = ref('');

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
            if (json.status === "success") {
                window.location.href = '/dashboard';
            } else {
                error.value = json.status;
                errorMessage.value = json.message;
            }

        }).catch(err => {
            errorMessage.value = "Er ging iets mis, probeer opnieuw.";
        })
}

function checkToken() {
    let token = localStorage.getItem("token");
    if (token === null) {
        window.location.href = "/";
    }
}

onMounted(() => {
    checkToken();
})

</script>

<template>
    <div class="card">
        <h2>Maak een transactie</h2>
        <div v-if="error == 'error'" class="error">
            <p class="error__message">{{ errorMessage }}</p>
        </div>
        <div>
            <h3>Username ontvanger</h3>
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