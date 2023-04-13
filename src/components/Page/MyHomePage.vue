<template>
    <div class="py-10 pt-[8rem] px-5 bg-gray-600 min-h-screen">
        <h1 class="before:inline-block before:absolute before:-top-3 
        before:h-1 before:w-16 before:content-[''] before:bg-black 
        font-semibold tracking-[0.2rem] text-3xl font-bebasNeue relative">We Provide <span class="text-primary">Second <br/> Cars</span> For Purchase</h1>

        <h3 class="mt-5 mb-20">Purchase directly from local suppliers. no commission, no mark-ups</h3>
        <div class="relative mb-20">
            <div class="w-auto px-5 pt-2 h-14 bg-primary rounded-t-md absolute -top-10 z-10">
                <h4 class="text-white">Cars For Buy</h4>
            </div>
            <div class="w-full bg-white rounded-lg relative z-20 p-5 flex flex-col gap-10 md:flex-row md:flex-grow md:w-1/2">
                <div class="bg-[#f1f1f1] p-5 rounded-lg">
                    <label for="brand" class="text-primary">Car's Brand</label>
                    <input type="text" id="brand" placeholder="Toyota" class="bg-transparent w-full text-xl outline-none">
                </div>
                <div class="bg-[#f1f1f1] p-5 rounded-lg">
                    <label for="brand" class="text-primary">Car's Model</label>
                    <input type="text" id="brand" placeholder="Avanza" class="bg-transparent w-full text-xl outline-none">
                </div>
                <button class="bg-primary w-2/3 h-14 rounded-lg px-5 box-border flex items-center gap-10 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00000" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
                    <p>Search</p>
                </button>
            </div>
        </div>
    </div>
</template>