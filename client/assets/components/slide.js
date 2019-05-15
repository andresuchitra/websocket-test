Vue.component('slider', {
    props: ['nextpost', 'user'],
    data() {
        return {
            current: 0,
        }
    },
    mounted() {
        this.current = 0
    },
    methods: {
        updatePost() {
            this.$emit('slidechange', this.current)
        },
        navigateNext() {
            this.current = (this.current + 1) % 5;
            this.$emit('slidechange', this.current)
            socket.emit('slidechange', {next: this.current, user: this.$props.user.name , key: this.$props.user.secret})
        },
        navigatePrev() {
            this.current--;
            this.current = (this.current < 0 ? (this.current + 5) : this.current);
            this.$emit('slidechange', this.current)
            socket.emit('slidechange', {next: this.current , user: this.$props.user.name, key: this.$props.user.secret})
        },
    },
    template: 
    `<div class="carousel justify-content-between">
        <div class="col-0 pl-5 btnContainer">
            <a href="#" class="navigateBtn" @click="navigatePrev">&#8249;</a>
        </div>
        <div class="col-0 pr-5 btnContainer" style="text-align: right;">
            <a href="#" class="navigateBtn ml-auto" @click="navigateNext">&#8250;</a>
        </div>
    </div>
    `
});