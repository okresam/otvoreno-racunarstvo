<template>
    <div v-if="!prikaziProfil" class="container mx-auto bg-slate-300 p-3 m-2">

        <h1 class="text-xl">Skup podataka Automobili</h1>
        <br />

        <button v-if="isLoggedIn" class="hover:bg-cyan-700 bg-cyan-800 rounded-lg p-3 m-2"
            @click="logout">Odjava</button>
        <button v-if="isLoggedIn" class="hover:bg-cyan-700 bg-cyan-800 rounded-lg p-3 m-2" @click="profil">Korisnički
            profil</button>
        <button v-if="isLoggedIn" class="hover:bg-cyan-700 bg-cyan-800 rounded-lg p-3 m-2" @click="refresh">Osvježi
            preslike</button>
        <button v-else class="hover:bg-cyan-700 bg-cyan-800 rounded-lg p-3 m-2" @click="login">Prijava</button>
        <br /><br />

        <a href="http://localhost:3001/csv" class="hover:bg-slate-400 bg-slate-500 rounded-lg p-3 m-2">CSV</a>
        <a href="http://localhost:3001/json" class="hover:bg-slate-400 bg-slate-500 rounded-lg p-3 m-2">JSON</a>

        <p class="mt-10">Podaci opisuju modele automobila od različitih proizvođača. Svaki model automobila može imati
            više vrsta motora.</p>
        <br />
        <b>Licenca:</b> Creative Commons Zero v1.0 Universal <br />
        <b>Autor:</b> Marko Okreša <br />
        <b>Verzija:</b> 1.0 <br />
        <b>Jezik:</b> Hrvatski <br />
        <b>Atributi:</b> <br />
        <br />
        <ul>
            <li>id_automobila - jedinstveni broj koji predstavlja primarni kljuc automobila</li>
            <li>proizvodac - naziv proizvođača automobila</li>
            <li>naziv_modela - naziv modela automobila</li>
            <li>pocetak_proizvodnje - godina početka proizvodnje modela automobila</li>
            <li>zavrsetak_proizvodnje - godina završetka proizvodnje modela automobila</li>
            <li>broj_sjedala - broj sjedala u automobilu</li>
            <li>broj_vrata - broj vrata na automobilu</li>
            <li>min_velicina_prtljaznika - veličina prtljažnika u litrima</li>
            <li>max_velicina_prtljaznika - veličina prtljažnika kada su spuštena zadnja sjedala u litrima</li>
            <li>duljina - duljina automobila u milimetrima</li>
            <li>sirina - širina automobila u milimetrima </li>
            <li>visina - visina automobila u milimetrima</li>
            <li>id_motora - jedinstveni broj koji predstavlja primarni kljuc motora</li>
            <li>gorivo - vrsta goriva za motor</li>
            <li>broj_cilindri - broj cilindri u motoru</li>
            <li>zapremina - zapremina motora u kubnim centimetrima</li>
            <li>snaga - konjska snaga motora</li>
            <li>okretni_moment - okretni moment motora u newton metrima</li>
            <li>id_auta - id_automobila kojem motor pripada</li>
        </ul>

        <button @click="this.$router.push({ name: 'Datatable' })"
            class="px-6 py-2 mt-2 mb-2 text-white bg-slate-500 rounded-lg hover:bg-slate-400">Datatable</button>

    </div>

    <div v-else class="container mx-auto bg-slate-300 p-3 m-2">
        <button @click="hideProfil"
            class="px-6 py-2 mt-2 mb-2 text-white bg-slate-500 rounded-lg hover:bg-slate-400">Povratak</button>
        <br /><br />
        <h1 class="text-2xl">Korisnički profil</h1>
        <br />
        <img v-bind:src="$auth0.user.value.picture" />
        <div class="flex">
            <h3 class="text-xl">Korisničko ime:</h3>
            <p class="p-1">{{ $auth0.user.value.nickname }}</p>
        </div>
        <div class="flex">
            <h3 class="text-xl">Ime:</h3>
            <p class="p-1">{{ this.$auth0.user.value.name }}</p>
        </div>
        <div class="flex">
            <h3 class="text-xl">Email:</h3>
            <p class="p-1">{{ this.$auth0.user.value.email }}</p>
        </div>
        <div class="flex">
            <h3 class="text-xl">Email potvrđen:</h3>
            <p class="p-1">{{ this.$auth0.user.value.email_verified }}</p>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    data() {
        return {
            prijavljen: false,
            prikaziProfil: false,
            isLoggedIn: false
        }
    },
    mounted() {
        const { user, isAuthenticated } = useAuth0();
        this.isLoggedIn = localStorage.getItem('isLoggedIn')
        this.prijavljen = isAuthenticated
    },
    methods: {
        async login() {
            try {
                await this.$auth0.loginWithPopup();
                localStorage.setItem('isLoggedIn', true)
                this.isLoggedIn = true
            } catch (e) {
                console.log("Login failed!")
            }
        },
        logout() {
            localStorage.clear()
            location.reload()
            //this.$auth0.logout({ returnTo: window.location.origin });
        },
        profil() {
            this.prikaziProfil = true
        },
        hideProfil() {
            this.prikaziProfil = false
        },
        async refresh() {
            await fetch('http://localhost:3001/refresh-data')
        }
    }
};
</script>