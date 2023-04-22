<template>
    <div class="py-10 px-5 pt-[8rem] bg-[url('/public/img/Home/heroimg.jpg')]  bg-gray-600 min-h-screen">
        <h1 class="before:inline-block before:absolute before:-top-3 
        before:h-1 before:w-16 before:content-[''] before:bg-black 
        font-semibold tracking-[0.2rem] text-3xl font-bebasNeue relative">We Provide <span class="text-primary">Second <br/> Cars</span> For Purchase</h1>
        <h3 class="mt-5 mb-20">Purchase directly from local suppliers. no commission, no mark-ups</h3>
        <SearchCard></SearchCard>

    </div>
</template>

<script>
import SearchCard from '../HomePage/SearchCard.vue';

export default{
    components:{
        SearchCard
    }
}

</script>