<template>
    <div>
        <bounce-loader class="mt-16 mx-auto" :loading="isLoading" :color="'#63b3ed'" :size="100"/>
        <px-table v-if="!isLoading" :assetsTable="assets" class="my-10 mx-auto"></px-table>
    </div>
</template>

<script>

import PxTable from "../components/PxTable.vue";
import api from "../api"
import {BounceLoader} from '@saeris/vue-spinners'

export default {
    name:"Home",
    components:{ PxTable, BounceLoader },
    // declaring variable to use in the component home
    data(){
        return{
            assets:[],
            isLoading: false
        }
    },
    // using the hook created to trigger the fetch method
    //when the component is created only
    created(){
        this.isLoading = true
        api.getAssets()
        .then(assets => (this.assets = assets))
        .finally(() => this.isLoading = false)
    }
}
</script>