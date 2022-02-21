<template>
    <header class="shadow w-screen">
       <nav>
           <nav class="flex items-center justify-between bg-blue-400 p-6">
               <div class="flex items-center flex-shrink-0 text-white mr-6">
                   <px-icon></px-icon>
                   <span class="ml-4 font-semibold text-xl tracking-tight"> <router-link :to="{name:'Home'}">Cripto Exchange</router-link></span>
               </div>
               <div class="hidden w-full blok flex-grow lg:flex lg:items-center">
                   <div class="text-sm lg:flex">
                       <router-link 
                            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" 
                            v-for="l in links"
                            :key="l.to.params.id"
                            :to="l.to"
                            > {{ l.title }} </router-link>
                   </div>
               </div>
           </nav>
       </nav>
    </header> 
</template>

<script>
import PxIcon from "./PxIcon.vue"
export default { 
    components:{ PxIcon },
    props:{
        links:{
            type:Array,
            default: () => []
        }
    }
}
</script>