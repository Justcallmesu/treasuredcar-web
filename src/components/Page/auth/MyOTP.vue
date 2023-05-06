<template>
    <div class="flex flex-col items-center gap-10 h-full w-2/4 bg-slate-100 rounded-lg py-12 px-12">
        <div class="text-center flex flex-col gap-2" v-if="getActions === 'register'">
            <h1 class="font-bold text-3xl">Daftar</h1>
            <h3>Memastikan Keamanan Akun Anda</h3>
        </div>
        <div class="text-center flex flex-col gap-2" v-if="getActions === 'forgotPassword'">
            <h1 class="font-bold text-3xl">Lupa Password ?</h1>
            <h3>Jangan Khawatir tentang akun anda</h3>
        </div>
        <div class="flex justify-center gap-5">
            <input type="text" class="otp" ref="otp-1" @change="changeFocus" maxlength="1">
            <input type="text" class="otp" ref="otp-2" @change="changeFocus" maxlength="1">
            <input type="text" class="otp" ref="otp-3" @change="changeFocus" maxlength="1">
            <input type="text" class="otp" ref="otp-4" @change="changeFocus" maxlength="1">
        </div>
        <div class="text-center">
            <p>Kode telah dikirim ke email anda</p>
            <h3 class="font-bold">exampole@gmail.com</h3>
        </div>
        <p>kode ini kadaluarsa dalam 1 jam</p>
        <button class="form-button">Verifikasi</button>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const {mapGetters} = createNamespacedHelpers("otp");

export default{
    computed:{
        ...mapGetters(["getActions"]),
    },
    methods:{
        changeFocus(){
            if(this.$refs["otp-1"].value >= 1){
                this.$refs["otp-2"].focus();
                this.$refs["otp-1"].blur();
            }
            if(this.$refs["otp-2"].value >= 1){
                this.$refs["otp-3"].focus();
                this.$refs["otp-2"].blur();
            }
            if(this.$refs["otp-3"].value >= 1){
                this.$refs["otp-4"].focus();
                this.$refs["otp-3"].blur();
            }
        }
    },
    created(){
        if(!this.getActions) this.$router.replace("/");
    }
}
</script>