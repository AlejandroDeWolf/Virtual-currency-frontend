<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'
import Navigation from '../components/Navigation.vue'


let username = ref('');
let transactions = ref('');
let sender = ref('');
let error = ref('');
let errorMessage = ref('');


function getTransactions() {
    let token = localStorage.getItem("token");

    fetch(config.url + "/transactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
    }).then(res => res.json())
        .then(json => {
            if (json.status === "success") {
                transactions.value = json.data.transactions;
                sender.value = json.data.user;
                username.value = localStorage.getItem("username");
            } else if(json.message === "Authorization failed") {
                window.location.href= "/";

            }
             else {
                error.value = json.status;
                errorMessage.value = json.message;
            }

        }).catch(err => {
            error.value = "error";
            errorMessage.value = "Er ging iets mis, probeer opnieuw.";
        })
}


onMounted(() => {
    getTransactions();
})
</script>

<template>
    <div class="card">
        <h2>Mijn transacties</h2>

        <div v-if="error == 'error'" class="error">
            <p class="error__message" >{{ errorMessage }}</p>
        </div>

        <div class="transactions scrollable">
            <ul class="transactions__list">
                <li class="transactions__list__item" v-bind:key="index" v-for="t, index in transactions">
                    <router-link class="router__link" :to="'/details/' + t._id">
                        <div v-if="t.receiver === username" v-bind:key="index" v-for="s, index in sender">
                            <div class="item__person" v-if="s._id === t.sender">
                                Van: {{ s.username }}
                            </div>
                        </div>
                        <div class="item__person" v-else>
                            Aan: {{ t.receiver }}
                        </div>

                        <div class="item__count" v-if="t.receiver === username">
                            <div>
                                    + {{ t.amount }} coins
                            </div>
                            <div>
                                {{ t.reason }}
                            </div>
                        </div>
                        <div class="item__count" v-else>
                            <div>
                                
                                - {{ t.amount }} coins
                            
                            </div>
                            <div>
                                {{ t.reason }}
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

    <Navigation />
</template>