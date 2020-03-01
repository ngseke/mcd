export const menu = {
  methods: {
    getIsBadgeShow (no) {
      no += ''
      return !no.includes('NEW')
    },
    getIsSetShow (name) {
      return this.briefSets.some(_ => name.includes(_)) || this.isAllSetShow
    },
  },
}