var vm = new Vue({
    el: '#app',
    data: {
        newTask: '',
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
        createTodo: function(){
            axios({
                method: 'post',
                url: `http://localhost:4000/todos/create`,
                headers: {
                    token: this.dataUser.token
                },
                data: {
                    task: this.newTask,
                    userId: this.dataUser.userId
                }
            })
            .then(response => {
                location.reload()
                console.log('CREATE SUCCESS =====', response)
            })
            .catch(err => {
                console.log('FAILED======', err)
            })
        },
        
        updateTodo: function(task){
            let newStatus = ''
            if(task.status == 'Completed'){
                newStatus += 'Uncomplete'
            } else {
                newStatus += 'Completed'
            }
            axios({
                method: 'put',
                url: `http://localhost:4000/todos/update/${task._id}`,
                headers: {
                    token: this.dataUser.token
                },
                data: {
                    status: newStatus,
                }
            })
            .then(response => {
                location.reload()
                console.log('UPDATE SUCCESS =====', response)
            })
            .catch(err => {
                console.log('FAILED======', err)
            })
        },

        deleteTodo: function(task_id){
            axios({
                method: 'delete',
                url: `http://localhost:4000/todos/delete/${task_id}`,
                headers: {
                    token: this.dataUser.token
                },
            })
            .then(response => {
                location.reload()
                console.log('DELETE SUCCESS =====', response)
            })
            .catch(err => {
                console.log('FAILED======', err)
            })
        },
    },

    created() {
        axios.get(`http://localhost:4000/todos/search`, {
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