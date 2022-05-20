<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'

let amount = ref('');
let firstname = ref('');
let lastname = ref('');

let type = ref('');
let transactions = ref('');

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
            console.log(json);
            if(json.status === "success"){
                let firstname = localStorage.getItem("firstname");
                let transactionsData = json.data.transactions
                transactionsData.forEach(element => {
                    if(element.receiver == firstname){
                        //je krijgt coins
                        type.value = "+"
                        console.log(type.value)
                    } else if(element.receiver != firstname) {
                        type.value = "-"
                        console.log(type.value)
                    }   
                })
                transactions.value = transactionsData;
            }

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
        <h3>{{ firstname + " " + lastname }}</h3>
        <div>
            <h2>{{ amount }}</h2>
            <p>credits</p>
        </div>
       <div>
            <router-link to="/send" class="btn btn--dashboard">Credits verzenden</router-link>
        </div>
        <div>
            <ul>
                <li v-bind:key="index" v-for="t, index in transactions">
                    <p @click="Details">Transactie</p>
                    <strong>From: {{ t.receiver }} </strong> 
                    <span> {{type}} {{t.amount}} coins </span> 
                    <span> {{t.reason}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>