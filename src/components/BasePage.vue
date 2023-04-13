<template>
    <div class="h-[5000px]">
        <TheHeader />
        <router-view v-slot="{Component}">
        <transition appear-active-class="Base-Appear-active" appear mode="out-in" name="Base">
                <component :is="Component"></component>
        </transition>
    </router-view>
        <TheBottomBar />
    </div>
</template>

<script>
import TheBottomBar from './Layout/TheBottomBar.vue'
export default {
    data() {
        return {
            test: "Okay Then"
        }
    },
    components: {
        TheBottomBar
    }
}
</script>

<style scoped>
/* Appear Class */
.Base-Appear-active{
    animation: fade 0.2 ease-in-out;
}

/* Transitions */
.Base-enter-active{
    transition: 1s all ease-in-out;
}
.Base-leave-active{
    transition: 1s all ease-in-out;
}
.Base-leave-to{
    transform: translateX(-100vw);
}
.Base-enter-from{
    transform: translateX(100vw);
}

/* Key Frames */
@keyframes fade{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

</style>