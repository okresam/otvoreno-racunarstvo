<template>

    <div class="container mx-auto bg-slate-300 p-3 m-2 overflow-x-auto relative">
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
export default {
    components: {
    },
    data() {
        return {
            automobili: []
        };
    },
    async mounted() {
        this.automobili = await (await fetch('http://localhost:3001/automobili/getall')).json()
        this.automobili.sort((a, b) => (a.id_automobila > b.id_automobila || a.id_motora > b.id_motora) ? 1 : -1)
    }
}
</script>