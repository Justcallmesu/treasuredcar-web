<template>
  <div>
    <div
      class="pb-20 px-5 pt-[8rem] relative overflow-x-hidden text-white bg-[url('/public/img/Home/heroimg.jpg')] bg-cover min-h-screen flex flex-col bg-no-repeat md:block z-0">
      <div class="absolute top-0 left-0 bg-black opacity-60 w-full h-full -z-10"></div>
      <h1
        class="before:inline-block before:absolute before:-top-3 before:h-1 before:w-16 before:content-[''] before:bg-white font-semibold tracking-[0.2rem] text-3xl font-bebasNeue relative">
        We Provide
        <span class="text-primary">Second <br />
          Cars</span>
        For Purchase
      </h1>
      <h3 class="mt-5 mb-20">
        Purchase directly from local suppliers. no commission, no mark-ups
      </h3>
      <HeroGalleries />
    </div>
    <MyDiscoverBrand />
    <MyDiscoverStyle />
    <CarList />
  </div>
</template>

<script>
import HeroGalleries from "../HomePage/HeroGalleries.vue";
import CarList from "../HomePage/CarList.vue";
import MyDiscoverBrand from "../HomePage/MyDiscoverBrand.vue";
import MyDiscoverStyle from "../HomePage/MyDiscoverStyle.vue";

export default {
  components: {
    HeroGalleries,
    CarList,
    MyDiscoverBrand,
    MyDiscoverStyle,
  },
};
</script>