Vue.component('todo-list', {
    props: ['datatodo', 'datauser'],
    template: `
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-warning">
                    <div class="box-body">
                        <table class="table table-bordered">
                            <tbody>
                            <tr>
                                <th style="text-align:center;">Todo Task</th>
                                <th style="text-align:center;">Task Status</th>
                                <th style="text-align:center;">Action</th>
                            </tr>
                            <tr v-for="todo in datatodo">
                                    <td> {{ todo.task }} </td>
                                    <td class="bg-danger" v-if="todo.status == 'Uncomplete'"> 
                                        <strong class="text-danger"> {{ todo.status }} </strong> 
                                    </td>
                                    <td class="bg-success" v-if="todo.status == 'Completed'"> 
                                        <p class="text-success"> {{ todo.status }} </p> 
                                        </td>
                                    <td>
                                    <button v-if="todo.status == 'Uncomplete'"  @click="updateTodo(todo)" type="button" class="btn btn-success btn-sm">
                                        <span class="glyphicon glyphicon-ok"></span> Completed
                                    </button>
                                    <button v-if="todo.status == 'Completed'"  @click="updateTodo(todo)" type="button" class="btn btn-warning btn-sm">
                                        <span class="glyphicon glyphicon-remove"></span> Uncomplete
                                    </button>
                                    <!-- <button class="btn btn-primary btn-sm" type="button">
                                        <span class="glyphicon glyphicon-floppy-disk"></span> Save 
                                    </button> -->
                                    <button class="btn btn-danger btn-sm" @click="deleteTodo(todo._id)" >
                                        <span class="glyphicon glyphicon-trash"></span> Delete
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    methods: {
        updateTodo: function(task){
            console.log('=========MASUK SINI====', this.datauser)
            let newStatus = ''
            if(task.status == 'Completed'){
                newStatus += 'Uncomplete'
            } else {
                newStatus += 'Completed'
            }
            axios({
                method: 'put',
                url: `http://backend1.agungcaproex.com:4000/todos/update/${task._id}`,
                headers: {
                    token: this.datauser.token
                },
                data: {
                    status: newStatus,
                }
            })
            .then(response => {
                // location.reload()
                let newTodo = []
                this.datatodo.forEach(todo => {
                    if(todo._id == `${task._id}`){
                        todo.status = newStatus
                    }
                    newTodo.push(todo)
                });
                this.datatodo = newTodo
                console.log('UPDATE SUCCESS =====', response)
            })
            .catch(err => {
                console.log('FAILED======', err)
            })
        },

        deleteTodo: function(task_id){
            console.log('=========MASUK SINI====',this.datauser)
            axios({
                method: 'delete',
                url: `http://backend1.agungcaproex.com:4000/todos/delete/${task_id}`,
                headers: {
                    token: this.datauser.token
                },
            })
            .then(response => {
                // location.reload()
                let currentTodo = this.datatodo.filter(listTodo => listTodo._id != `${task_id}`)
                this.datatodo = currentTodo

                // let index = this.datatodo.indexOf(`${task_id}`)

                console.log('DELETE SUCCESS =====', response)
            })
            .catch(err => {
                console.log('FAILED======', err)
            })
        },
    },
    
})