<template>
    <div class="container mx-auto bg-slate-300 p-3 m-2">

        <h1 class="text-xl">Skup podataka Automobili</h1>
        <br/>

        <a href="http://localhost:3001/csv" class="hover:bg-slate-400 bg-slate-500 rounded-lg p-3 m-2">CSV</a>
        <a href="http://localhost:3001/json" class="hover:bg-slate-400 bg-slate-500 rounded-lg p-3 m-2">JSON</a>

        <p class="mt-10">Podaci opisuju modele automobila od različitih proizvođača. Svaki model automobila može imati više vrsta motora.</p>
        <br/>
        <b>Licenca:</b> Creative Commons Zero v1.0 Universal <br />
        <b>Autor:</b> Marko Okreša <br />
        <b>Verzija:</b> 1.0 <br />
        <b>Jezik:</b> Hrvatski <br />
        <b>Atributi:</b> <br />
        <br/>
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

    </div>
</template>

<script>

</script>