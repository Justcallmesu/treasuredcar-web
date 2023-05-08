<template>
    <div class="relative overflow">
        <img :src="getImg(path)" alt="Car Images" class="h-[6rem] w-full rounded-2xl object-cover 
                md:w-[10.435rem] md:h-[30rem]">
        <div class="absolute top-0 left-0 bg-black opacity-60 w-full h-full rounded-2xl"></div>
        <h3 class="absolute w-full top-1/2 text-white text-center text-2xl font-semibold md:writing-mode-vlr md:top-1/3">{{ text }}</h3>
    </div>
</template>

<script>
export default{
    props:{
        path:{
            type:String,
            required:true
        },
        text:{
            type:String
        }
    },
    methods:{
        getImg(path){
            return require(`../../../public/img/Home/${path}`);
        }
    }
}
</script>