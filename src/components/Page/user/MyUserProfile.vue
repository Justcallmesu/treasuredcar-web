<template>
    <main class="flex flex-col gap-20">
        <section class="flex items-center gap-5">
            <div class="max-w-[9rem] rounded-full overflow-hidden">
                <img :src="getImg" :alt="getUserData.photo + ' Photo'" class="object-cover object-center">
            </div>
            <h1 class="font-bold text-2xl">{{ getUserData.name }}</h1>
        </section>
        <section class="flex flex-col gap-10">
            <section class="grid grid-cols-2 gap-x-24 gap-y-10">
                <div class="form-control">
                    <label for="fullName">Full Name</label>
                    <input type="text" class="form-input" name="name" id="fullName" v-model="fullName">
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" class="form-input" name="email" id="email" v-model="email">
                </div>
                <div class="form-control">
                    <label for="image">Photo</label>
                    <input type="file" accept="image/*" name="photo" id="image" ref="fileinput">
                </div>
            </section>
            <button class="self-start btn__cta" @click="updateUser">Save Changes</button>
        </section>
    </main>
</template>

<script>
// NPM
import axios from 'axios';

// Config
import config from '@/utils/config';

import {createNamespacedHelpers} from 'vuex';

const {mapGetters,mapMutations} = createNamespacedHelpers("user");

export default{
    data(){
        return{
            email:"",
            fullName:""
        }
    },
    beforeMount(){
        this.email = this.getUserData.email;
        this.fullName = this.getUserData.name;
    },
    computed:{
        ...mapGetters(["getUserData"]),
        getImg(){
            return `${process.env.VUE_APP_serverURL}/users/${this.getUserData.photo}`;
        }
    },
    methods:{
        ...mapMutations(["setUserData"]),
        async updateUser(){
            if (!this.email || !this.fullName){
                this.setModalData({ callback: () => { }, title: "Update Seller", message: "Data Tidak Boleh Kosong" });
                this.setModalVisible(true);
                return;
            }

            const formData = new FormData();
            formData.append("name",this.fullName);
            formData.append("email",this.email);

            if(this.$refs.fileinput.files[0]){
                formData.append("photo",this.$refs.fileinput.files[0])
            }

            const response = await axios.patch(`${process.env.VUE_APP_serverURL}/api/v1/user/updateMe`,
            formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })

            if(!response.status === 200) return;

            const userData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/user/me`,
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!userData.status === 200) return;

            const { data } = userData;
            this.setUserData(data.data);
            this.$router.replace("/");
        }
    }
}

</script>