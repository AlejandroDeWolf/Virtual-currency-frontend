<script>

</script>


<template>
    <div class="nav">
        <div class="link">
            <router-link to="/dashboard" class="nav__link nav__link--nav">
                <div class="icon"><img src="../assets/home-inactive.svg" alt=""></div>
                <div>Home</div>
            </router-link>
        </div>
        <div class="link">
            <router-link to="/transactions" class="nav__link nav__link--nav">
                <div class="icon"><img src="../assets/transactions-inactive.svg" alt=""></div>
                <div>Transacties</div>
            </router-link>
        </div>
        <div class="link">
            <router-link to="/send" class="nav__link nav__link--nav">
                <div class="icon"><img src="../assets/send-inactive.svg" alt=""></div>
                <div>Sturen</div>
            </router-link>
        </div>

    </div>

</template>

<style scoped>
</style>