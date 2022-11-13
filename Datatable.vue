<template>

    <div class="container mx-auto bg-slate-200 p-3 m-2 overflow-x-auto relative">

        <button @click="this.$router.push({ name: 'Index'})" class="px-6 py-2 mt-2 mb-2 text-white bg-slate-500 rounded-lg hover:bg-slate-400">Povratak</button>

        <form @submit.prevent="trazi">
            <input class="px-4 py-2 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600" v-model="pretraga" />
            <br/>
            <select v-model="selected">
                <option value="all">Sva polja(Wildcard)</option>
                <option v-for="p in polja" :value="p">{{ p }}</option>
            </select>
            <br/>
            <button class="px-6 py-2 mt-4 text-white bg-slate-500 rounded-lg hover:bg-slate-400">Pretraži</button>
        </form>

        <button @click="downloadCsv" class="px-6 py-2 m-2 text-white bg-slate-500 rounded-lg hover:bg-slate-400">CSV</button>
        <button @click="downloadJson" class="px-6 py-2 m-2 text-white bg-slate-500 rounded-lg hover:bg-slate-400">JSON</button>

        <table class="p-3 m-3 w-full text-sm text-left text-gray-500">
            <thead class="text-xl text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th class="py-3 px-6">id_automobila</th>
                    <th class="py-3 px-6">proizvodac</th>
                    <th class="py-3 px-6">naziv_modela</th>
                    <th class="py-3 px-6">pocetak_proizvodnje</th>
                    <th class="py-3 px-6">zavrsetak_proizvodnje</th>
                    <th class="py-3 px-6">broj_sjedala</th>
                    <th class="py-3 px-6">broj_vrata</th>
                    <th class="py-3 px-6">min_velicina_prtljaznika</th>
                    <th class="py-3 px-6">max_velicina_prtljaznika</th>
                    <th class="py-3 px-6">duljina</th>
                    <th class="py-3 px-6">sirina</th>
                    <th class="py-3 px-6">visina</th>
                    <th class="py-3 px-6">id_motora</th>
                    <th class="py-3 px-6">gorivo</th>
                    <th class="py-3 px-6">broj_cilindri</th>
                    <th class="py-3 px-6">zapremina</th>
                    <th class="py-3 px-6">snaga</th>
                    <th class="py-3 px-6">okretni_moment</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="auto in automobili" class="bg-white border-b">
                    <td class="py-4 px-6">{{ auto.id_automobila }}</td>
                    <td class="py-4 px-6">{{ auto.proizvodac }}</td>
                    <td class="py-4 px-6">{{ auto.naziv_modela }}</td>
                    <td class="py-4 px-6">{{ auto.pocetak_proizvodnje }}</td>
                    <td class="py-4 px-6">{{ auto.zavrsetak_proizvodnje }}</td>
                    <td class="py-4 px-6">{{ auto.broj_sjedala }}</td>
                    <td class="py-4 px-6">{{ auto.broj_vrata }}</td>
                    <td class="py-4 px-6">{{ auto.min_velicina_prtljaznika }}</td>
                    <td class="py-4 px-6">{{ auto.max_velicina_prtljaznika }}</td>
                    <td class="py-4 px-6">{{ auto.duljina }}</td>
                    <td class="py-4 px-6">{{ auto.sirina }}</td>
                    <td class="py-4 px-6">{{ auto.visina }}</td>
                    <td class="py-4 px-6">{{ auto.id_motora }}</td>
                    <td class="py-4 px-6">{{ auto.gorivo }}</td>
                    <td class="py-4 px-6">{{ auto.broj_cilindri }}</td>
                    <td class="py-4 px-6">{{ auto.zapremina }}</td>
                    <td class="py-4 px-6">{{ auto.snaga }}</td>
                    <td class="py-4 px-6">{{ auto.okretni_moment }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    components: {
    },
    data() {
        return {
            automobili: [],
            selected: "all",
            polja: ["id_automobila", 
                    "proizvodac",
                    "naziv_modela",
                    "pocetak_proizvodnje",
                    "zavrsetak_proizvodnje",
                    "broj_sjedala",
                    "broj_vrata",
                    "min_velicina_prtljaznika",
                    "max_velicina_prtljaznika",
                    "duljina",
                    "sirina",
                    "visina",
                    "id_motora",
                    "gorivo",
                    "broj_cilindri",
                    "zapremina",
                    "snaga",
                    "okretni_moment"],
            pretraga: ""
        };
    },
    async mounted() {
        this.automobili = await (await fetch('http://localhost:3001/automobili/getall')).json()
        this.automobili.sort((a, b) => (a.id_automobila > b.id_automobila || a.id_motora > b.id_motora) ? 1 : -1)
    },
    methods: {
        convertToCsv(jsonData) {
            const array = [Object.keys(jsonData[0])].concat(jsonData)

            return array.map(it => {
                return Object.values(it).toString()
            }).join('\n')
        },
        downloadCsv() {
            let csv = this.convertToCsv(this.automobili)

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
            const link = document.createElement('a')
            link.setAttribute('href', URL.createObjectURL(blob))
            link.setAttribute('download', 'automobili-filtered.csv')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        async downloadJson() {
            //let json = JSON.stringify(this.automobili)
            let json = await axios.post('http://localhost:3001/automobili/search/json', { atribut: this.selected, searchTerm: this.pretraga })
            json = JSON.stringify(json.data)

            const blob = new Blob([json], { type: 'text/json;charset=utf-8' })
            const link = document.createElement('a')
            link.setAttribute('href', URL.createObjectURL(blob))
            link.setAttribute('download', 'automobili-filtered.json')
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        async trazi() {
            let rezultatPretrage = await axios.post('http://localhost:3001/automobili/search', { atribut: this.selected, searchTerm: this.pretraga })

            this.automobili = rezultatPretrage.data
            //console.log(JSON.stringify(this.automobili))
            //console.log(this.convertToCsv(this.automobili))
        }
    }
}
</script>