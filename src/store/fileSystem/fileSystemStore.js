import { defineStore } from 'pinia';

export const fileSystemStore = defineStore('main', {
  state: () => ({
    folderInfo: {}
  }),
  actions: {
    revamp(i) {
        this.folderInfo = i
    }
  },
  getters: {
  },
});
