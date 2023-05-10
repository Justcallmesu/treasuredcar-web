<template>
    <main class="flex flex-col gap-20">
        <section class="flex items-center gap-5">
            <div class="max-w-[9rem] rounded-full overflow-hidden">
                <img :src="getImg" :alt="getSellerData.photo + ' Photo'" class="object-cover object-center">
            </div>
            <h1 class="font-bold text-2xl">{{ getSellerData.name }}</h1>
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
                    <label for="Phone">Phone</label>
                    <input type="text" class="form-input"  id="Phone" ref="fileinput" v-model="phoneNumber">
                </div>
                <div class="form-control">
                    <label for="address">Address</label>
                    <input type="text" class="form-input" id="address" ref="fileinput" v-model="address">
                </div>
                <div class="form-control">
                    <label for="image">Photo</label>
                    <input type="file" accept="image/*" name="photo" id="image" ref="fileinput">
                </div>
            </section>
            <button class="self-start btn__cta" @click="updateSeller">Save Changes</button>
        </section>
    </main>
</template>

<script>
// NPM
import axios from 'axios';

// Config
import config from '@/utils/config';

import {createNamespacedHelpers} from 'vuex';

const {mapGetters,mapMutations} = createNamespacedHelpers("seller");

export default{
    data(){
        return{
            email:"",
            fullName:"",
            phoneNumber:"",
            address:"",
        }
    },
    beforeMount(){
        this.email = this.getSellerData.email;
        this.fullName = this.getSellerData.name;
        this.phoneNumber = this.getSellerData.phoneNumber;
        this.address = this.getSellerData.address;
    },
    computed:{
        ...mapGetters(["getSellerData"]),
        getImg(){
            return `${process.env.VUE_APP_serverURL}/sellers/${this.getSellerData.photo}`;
        }
    },
    methods:{
        ...mapMutations(["setSellerData"]),
        async updateSeller(){
            if (!this.email || !this.fullName || !this.phoneNumber || !this.address){
                return console.log("No Empty");
            }

            const formData = new FormData();
            formData.append("name",this.fullName);
            formData.append("email",this.email);
            formData.append("phoneNumber",this.phoneNumber);
            formData.append("address",this.address);

            if(this.$refs.fileinput.files[0]){
                formData.append("photo",this.$refs.fileinput.files[0])
            }

            const response = await axios.patch(`${process.env.VUE_APP_serverURL}/api/v1/seller/updateMe`,
            formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })

            if(!response.status === 200) return;

            const sellerData = await axios.get(`${process.env.VUE_APP_serverURL}/api/v1/seller/me`,
                {
                    withCredentials: true,
                    headers: config.headers
                }
            );
            if (!sellerData.status === 200) return;

            const { data } = sellerData;
            this.setSellerData(data.data);
            this.$router.replace("/");
        }
    }
}

</script>