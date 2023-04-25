<template>
    <header class="px-5 py-5 fixed top-0 w-full bg-[#efefef] flex z-30 justify-between items-center shadow-lg">
        <router-link to="/">
            <h1 class="font-poppins font-bold tracking-wide text-xl text-[#3E3E3E]">Treasured<span class="text-primary">Car</span></h1>
        </router-link>
        <div class="relative hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fefefe" class="bi bi-search absolute top-1/4 left-3" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
            <input type="text" name="search" id="search" class="bg-primary text-[#fefefe] focus:border-none focus:outline-none pl-8 px-4 py-1 box-border w-64 rounded-3xl" autocomplete="off">
        </div>
    </header>
</template>


<script>
    export default{
        
    }
</script>