var vm = new Vue({
    el: '#app',
    data: {
        // newTask: '',
        statusTask: '',
        todos: [],
        dataUser: {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email')
        }
    },
    methods: {
        
    },

    created: function(){
        // if(dataUser){
        //     window.location.href="home.html"
        // }

        axios.get(`http://backend1.agungcaproex.com:4000/todos/search`, {
            headers: {
                token: this.dataUser.token
            }
        })
        .then(response => {
            console.log('MASUK=====', response)
            this.todos = response.data.data
        })
        .catch(err => {
            console.log('ERROR======',err)
        })
    }
})