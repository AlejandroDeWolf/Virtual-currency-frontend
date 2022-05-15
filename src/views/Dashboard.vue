<script setup>
import { ref, onMounted } from 'vue'
import config from '../../config/config'

let amount = ref('');
let firstname = ref('');
let lastname = ref('');

function getUser() {
    let token = localStorage.getItem("token");
    
    fetch(config.url + "/users/amount", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":  token
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

onMounted(() => {
    getUser();
})
</script>

<template>
    <div class="card">
        <h3>{{ firstname + " " + lastname }}</h3>
        <div>
            <h2 >{{ amount }}</h2>
            <p >credits</p>
        </div>
        <div>
            <input type="submit" value="Credits verzenden">
        </div>
    </div>
</template>