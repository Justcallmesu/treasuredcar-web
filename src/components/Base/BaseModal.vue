<template>
    <div class="w-full h-full flex justify-center items-center bg-black bg-opacity-60 fixed top-0 left-0 z-[100]" @click.self="modalOkNo">
        <div class="w-1/3 h-fit bg-white rounded-xl relative px-10 py-10">
            <button class="w-12 px-2 py-2 bg-primary rounded-full text-2xl absolute -top-3 -right-3 hover:bg-[#4f7d53]" @click.self="modalOkNo">X</button>
            <div class="w-full h-full flex flex-col gap-5">
                <div>
                    <h1 class="text-primary text-5xl font-bold">{{ modalTitle }}</h1>
                    <hr class="border-primary border-2 mt-2"/>
                </div>
                <p class="text-2xl">
                    {{ modalMessage }}
                </p>
                <div v-if="modalYesNo" class="flex gap-10">
                    <button @click="modalYes" class="btn__cta w-full text-2xl">YES</button>
                    <button @click="modalOkNo" class=" w-full text-2xl border-primary border-2 rounded-xl">NO</button>
                </div>
                <div v-else>
                    <button @click="modalOkNo" class="btn__cta w-full text-2xl">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        modalTitle:{
            type:String,
            required:true
        },
        modalCallback:{
            type:Function,
            required:true
        },
        setModalVisible:{
            type:Function,
            required:true
        },
        modalMessage:{
            type:String,
            required:true
        },
        modalYesNo:{
            type:Boolean,
            required:true
        },
        yesCallback:{
            type:Function,
            required:true
        },
        noCallback:{
            type:[Function,Object],
        }
    },
    methods:{
        modalOkNo(){
            if(this.noCallback) this.noCallback?.();
            this.modalCallback?.();
            this.setModalVisible(false);
        },
        modalYes(){
            this.yesCallback?.();
            this.setModalVisible(false);
        }
    }
}
</script>