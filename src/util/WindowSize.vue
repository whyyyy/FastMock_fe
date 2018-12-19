<script>
export default {
  name: 'WindowSize',
  data () {
    return {
      browser: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.browser.width = window.innerWidth
      this.browser.height = window.innerHeight
    }
  }
}
</script>
