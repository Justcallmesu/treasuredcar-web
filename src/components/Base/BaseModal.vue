<template>
    <div class="w-full h-full flex justify-center items-center bg-black bg-opacity-60 fixed top-0 left-0 z-[100]" @click.self="modalTrigger">
        <div class="w-2/3 h-2/3 bg-white rounded-xl relative px-10 py-10">
            <button class="w-12 px-2 py-2 bg-primary rounded-full text-2xl absolute -top-3 -right-3 hover:bg-[#4f7d53]" @click.self="modalTrigger">X</button>
            <div class="w-full h-full">
                <h1 class="text-primary text-5xl font-bold">{{ modalTitle }}</h1>
                <div class="mt-2 whitespace-pre-line">
                    <p class="text-xl">
                        {{ modalMessage }}
                    </p>
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
        }
    },
    methods:{
        modalTrigger(){
            this.modalCallback?.();
            this.setModalVisible(false);
        }
    }
}
</script>