<template>
  <div class="flex-col">
    <bounce-loader class="mt-16 mx-auto" :loading="isLoading" :color="'#63b3ed'" :size="100"/>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percentege }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >{{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
              v-model="convertedValue"
                id="convertValue"
                :placeholder="`valor en ${fromUsd ? 'USD' : asset.symbol}`"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl">{{ convertedResult }} {{ fromUsd ? `${asset.symbol}` : `USD` }}</span>
        </div>
      </div>

    <line-chart
        class="my-10 w-9/12 mx-auto"
        :colors="['blue']"
        :min="min"
        :max="max"
        :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
    />

    <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table class="mx-auto w-3/4">
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b> {{ m.exchangeId }} </b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol}}</td>
          <td>
            <px-button :is-loading="m.isLoading || false" @custom-click="getWebSite(m)" v-if="!m.url"> Obtener link </px-button>
            <a v-else :href="m.url" class="hover:underline text-blue-600 cursor-pointer" target="_blanck">{{m.url}}</a>
          </td>
        </tr>
      </table>

    </template>
  </div>
</template>

<script>
import PxButton from "@/components/PxButton.vue";
import api from '@/api'
import { BounceLoader } from '@saeris/vue-spinners'

export default {
  name: 'CoinDetail',
  components:{BounceLoader, PxButton},

  data() {
    return {
      asset: {},
      history: [],
      markets:[],
      isLoading: false, 
      fromUsd: true,
      convertedValue: null
    }
  },

  computed: {
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    convertedResult(){
      if (!this.convertedValue) {
        return 0
      }

      const result = this.fromUsd 
      ? this.convertedValue/ this.asset.priceUsd 
      : this.convertedValue * this.asset.priceUsd
      
      return result.toFixed(4)
    }

  },

  watch:{
    $route(){
      this.getCoin()
    }
  },

  created() {
    this.getCoin()
  },

  methods: {
    toggleConverter(){
      this.fromUsd = !this.fromUsd
    },

    getCoin() {
        this.isLoading = true
      const id = this.$route.params.id

      Promise.all([api.getAsset(id), api.getAssetHistory(id), api.getMarkets(id)])
      .then(
            ([asset, history, markets]) => {
                this.asset = asset
                this.history = history
                this.markets = markets
            }
        )
        .finally(() => this.isLoading = false)
    },

    getWebSite(exchange){
      this.$set(exchange, 'isLoading', true)

      return api.getExchange(exchange.exchangeId)
        .then(res => {
          this.scaleLoader = true
          this.$set(exchange, 'url', res.exchangeUrl)
        }).finally(()=> {this.$set(exchange, 'isLoading', false)})
    }
  }
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>

