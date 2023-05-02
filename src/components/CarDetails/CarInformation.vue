<template>
    <main class="mt-10 grid grid-cols-2 gap-x-10">
        <!-- Car Information -->
        <section class="flex flex-col gap-5">
            <section>
                <h1 class="text-3xl text-white font-semibold px-2 py-2 bg-primary">Car Information</h1>
                <div class="grid grid-cols-2 gap-x-20 gap-y-5 px-2 py-2">
                    <div>
                        <h3 class="font-semibold">CC</h3>
                        <p>{{ car.cc }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">Body Type</h3>
                        <p>{{ car.bodyType }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">Plate Number</h3>
                        <p>{{ car.plateNumber }}</p>
                    </div>
                </div>
            </section>
            <!-- Car Tax Information -->
            <section>
                <h1 class="text-3xl text-white font-semibold px-2 py-2 bg-primary">Car Taxes</h1>
                <section class="grid grid-cols-2 gap-x-20 gap-y-5 px-2 py-2">
                    <div>
                        <h3 class="font-semibold">PKB Pokok</h3>
                        <p>Rp {{ getTax.PKBPokok.toLocaleString("id-ID") }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">PKB Denda</h3>
                        <p>Rp {{ getTax.PKBDenda.toLocaleString("id-ID") }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">SWDKLLJ Pokok</h3>
                        <p>Rp {{ getTax.SWDKLLJPokok.toLocaleString("id-ID") }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">SWDKLLJ Denda</h3>
                        <p>Rp {{ getTax.SWDKLLJDenda.toLocaleString("id-ID") }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">Pokok Tax Total</h3>
                        <p>Rp {{ getTax.pokokTaxTotal.toLocaleString("id-ID") }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold">Denda Tax Total</h3>
                        <p>Rp {{ getTax.dendaTaxTotal.toLocaleString("id-ID") }}</p>
                    </div>
                </section>
            </section>
        </section>
        <section>
            <h1 class="text-3xl text-white font-semibold px-2 py-2 bg-primary">Seller Description</h1>
            <section class="px-2 py-2">
                <p class="text-justify">{{ car.description }}</p>
            </section>
        </section>
    </main>
</template>

<script>


export default{
    props:{
        car:{
            type:Object,
            required:true
        }
    },
    computed:{
        getTax(){
            return this.car.tax;
        }
    }
}
</script>