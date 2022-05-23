<script setup>
import { ref, onMounted } from 'vue'
import { config } from '../../config/config'
import Navigation from '../components/Navigation.vue'


let users = ref('');
let balance = ref('');

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
            console.log(json);
            //sort leaderboard descending
            if(json.status === "success"){
                let arrayOfObjects = json.data.users;
                let byAmount = arrayOfObjects.slice(0);

                let userData = byAmount.sort(function(a,b) {
                    let array = b.balance - a.balance;
                    return array;
                });
                users.value = userData;

            } else if(json.message === "Authorization failed") { //did not go through middleware so not logged in
                window.location.href= "/";
            } else {
                error.value = json.status;
                errorMessage.value = json.message;
            }
            

        })
}

onMounted(() => {
    getAllUsers();
})


</script>

<template>
    <div class="card">
        <h2>Leaderboard</h2>
        <div class="scrollable">
            <ul class="list">
                <li class="list__item" v-for="user in users">
                   <span>
                       {{ user.username }}
                    </span> 
                    <span class="list__item__balance">
                        {{ user.balance }}
                    </span>  
                </li>
            </ul>
        </div>
    </div>

     <Navigation />
</template>