<template>
    <div class="h-[5000px]">
        <TheHeader />
        <router-view>

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