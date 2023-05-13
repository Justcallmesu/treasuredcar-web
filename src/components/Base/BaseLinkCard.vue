<template>
    <router-link :to="getURL">
        <slot></slot>
    </router-link>
</template>

<script>
export default{
    props:{
        url:{
            type:String,
            required:true
        }
    },
    computed:{
        getURL(){
            const name = this?.url?.split(".")[0];
            return `/cars?brand=${name}`
        }
    }
}
</script>