<template>
    <div class="flex flex-col gap-5 md:absolute md:right-0 md:top-[20%] md:flex-row">
        <img src="../../../public/img/Home/img-1.jpg" alt="Car Images" class="h-[12rem] w-full rounded-2xl object-cover 
        md:w-[20.435rem] md:h-[30rem]">
        <BaseGalleryCard path="img-2.jpg" text="Family Cars"/>
        <BaseGalleryCard path="img-3.jpg" text="Cars for Two Person"/>
    </div>
</template>


<script>
import BaseGalleryCard from '../Base/BaseGalleryCard.vue';

export default{
    components:{
        BaseGalleryCard
    }
}
</script>