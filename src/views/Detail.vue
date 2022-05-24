<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'
import Navigation from '../components/Navigation.vue'
import router from '../router/index'

let username = ref('');
let transaction = ref('');
let date = ref('');
let sender = ref('');
let error = ref('');
let errorMessage = ref('');

//let id = this.$route.params.id;
const url = window.location.href;
const id = url.split("/").slice(-1)[0];

//get transaction details from one by id
function Details() {
    let token = localStorage.getItem("token");

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
            if(json.status === "success") {
                transaction.value = json.data.transaction;
                sender.value = json.data.user[0].username;
                username.value = localStorage.getItem("username");

                let created = json.data.transaction.createdAt;
                let dateString = created.toString();
                date.value = dateString.slice(0, 10);
                
            } else if(json.message === "Authorization failed") {
                window.location.href= "/";
            } else {
                error.value = json.status;
                errorMessage.value = json.message;
            }
        })
}

onMounted(() => {
    Details();
})
</script>

<template>
    <div class="card">

        <div v-if="error == 'error'" class="error">
            <p class="error__message" >{{ errorMessage }}</p>
        </div>
        <div>
            <div v-if="transaction.receiver == username">
                <h2>Transactie van {{ sender }}</h2>
            </div>
            <div v-else>
                <h2>Transactie naar {{ transaction.receiver }}</h2>
            </div>
            <div>
                <p>Bedrag: {{ transaction.amount }} coins</p>
                <p>Omschrijving: {{ transaction.reason }}</p>
                <p>Datum: {{ date }}</p>
            </div>
        </div>
        
    </div>

    <Navigation />
</template>