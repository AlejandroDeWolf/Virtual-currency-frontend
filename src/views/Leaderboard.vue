<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'

let users = ref('');

function getAllUsers() {
    let token = localStorage.getItem("token");

    fetch(config.url + "/users/leaderboard", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    }).then(res => res.json())
        .then(json => {
            //amount = json.userAmount[0].balance;
            console.log(json.data.users);
            users.value = json.data.users;
        })
}

onMounted(() => {
    getAllUsers();
})
    

</script>

<template>
    <ul>
        <li v-for="user in users">
            {{user.firstname}} {{user.lastname}} {{user.balance}}
        </li>
    </ul>
</template>