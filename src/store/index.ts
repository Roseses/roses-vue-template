import { defineStore } from 'pinia'
import { Names } from './store-name'
export const useTestStore = defineStore( Names.Test, {
    state: (()=> ({
       current: 10000
    })),
    getters: {

    },
    actions: {
      
    }
})