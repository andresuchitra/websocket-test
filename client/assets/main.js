const socket = io.connect('http://localhost:3000')

const app = new Vue({
    el: '#app',
    data: {
        slides: [
            {   id: 0,
                text: 'Slide 1',
                img: 'slide1.jpg',
            }, {
                id: 1,
                text: 'Slide 2',
                img: 'slide2.jpg',
            }, {
                id: 2,
                text: 'Slide 3',
                img: 'slide3.jpg',
            }, {
                id: 3,
                text: 'Slide 4',
                img: 'slide4.jpg',
            }, {
                id: 4,
                text: 'Slide 5',
                img: 'slide5.jpg',
            },
        ],
        user: {
            name: '',
            message:'',
            secret: '',
        },
        started: false,
        bckImg: '',
        next: null,
    },
    mounted() {
        this.bckImg = "url('assets/img/slide1.jpg')"
        socket.on('access', (data) => {
            if(data.access === 'granted') {
                this.started = true
            }
            else {
                swal.fire('Oops', 'Access denied. Try again.', 'error')
                this.started = false
            }
        })

        socket.on('navigate', (data) => {
            if(this.started) {
                let newPic = this.slides.find(x => x.id === data.next).img
                this.bckImg = `url('assets/img/${newPic}')`
                this.next = data.next
            }
        })
    },
    methods: {
        onslidechange(newPost) {
            let newPic = this.slides.find(x => x.id === newPost).img
            this.bckImg = `url('assets/img/${newPic}')`
        },
        processLogin() {
            if(!this.user.name) {
                swal.fire('Error', 'Please key in your name and secret key!', 'error')
            }
            else {
                socket.emit('init', this.user)
            }
        }
    },
})