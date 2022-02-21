<template>
    <button @click="buttonClick" class="bg-transparent outline-none hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
        <sync-loader :loading="isLoading" :color="'#63b3ed'" :size="8" />
        <p v-show="!isLoading">
            <slot></slot>
        </p>
    </button>
</template>

<script>
import { SyncLoader } from '@saeris/vue-spinners'
export default {
    name: "PxButton",
    components:{SyncLoader},
    props:{
        isLoading:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        buttonClick(){
            this.$emit("custom-click")
        }
    }
}
</script>