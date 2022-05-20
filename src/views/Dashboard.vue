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


function getTransactions(){
    let token = localStorage.getItem("token");

    fetch(config.url + "/transactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
    }).then(res => res.json())
        .then(json => {
            if(json.status === "success"){
                transactions.value = json.data.transactions;
                sender.value = json.data.user;
            }
            console.log(json);

        }).catch(err => {
            console.log(err)
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
    getTransactions();
})
</script>

<template>
    <div class="card">
        <h3 class="user">{{ firstname + " " + lastname }}</h3>
        <div class="balance">
            <h2 class="balance__amount"> {{ amount }}</h2>
            <p class="balance__text">credits</p>
        </div>
       <div>
            <router-link to="/send" class="btn btn--dashboard">Credits verzenden</router-link>
        </div>
        <div class="transactions">
            <ul class="transactions__list">
                <li class="transactions__list__item" v-bind:key="index" v-for="t, index in transactions">
                    <!-- <div @click="Details">
                        From: {{ t.receiver }}
                    </div>   -->
                    <div  v-if="t.receiver === firstname" v-bind:key="index" v-for="s, index in sender">
                        <div class="item__person" v-if="s._id === t.sender">
                            Van:  {{ s.firstname }}
                        </div>
                    </div> 
                    <div class="item__person" v-else>
                       Aan: {{ t.receiver}}
                    </div> 

                    <div class="item__count" v-if="t.receiver === firstname">
                        <div>
                            + {{t.amount}} coins
                        </div>
                        <div>
                            {{ t.reason}}
                        </div>
                    </div>
                    <div class="item__count" v-else>
                        <div>
                            - {{t.amount}} coins
                        </div>
                        <div>
                            {{ t.reason}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>