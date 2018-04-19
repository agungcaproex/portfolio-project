Vue.component('todo-form', {
    props: ['datauser', 'datatodo'],
    template: `
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-warning">
                    <div class="box-body">
                        <h1 class="col-md-8 col-md-offset-4">Add new to do !</h1>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>Your Task List</label>
                            <input type="text" class="form-control" v-model="newTask" @keyup.enter="createTodo()" placeholder="Task List ...">
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <button type="submit" class="btn btn-primary" @click="createTodo()">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    data: {
        newTask: ''
    },
    methods: {
        createTodo: function(){
            axios({
                method: 'post',
                url: `http://backend1.agungcaproex.com:4000/todos/create`,
                headers: {
                    token: this.datauser.token
                },
                data: {
                    task: this.newTask,
                    userId: this.datauser.userId
                }
            })
            .then(response => {
                // location.reload()
                this.datatodo.push(response.data.data)
                console.log('CREATE SUCCESS =====', response)
            })
            .catch(err => {
                console.log('FAILED======', err)
            })
        },
    }
})