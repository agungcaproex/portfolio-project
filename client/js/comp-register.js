Vue.component('todo-register', {
    template: `
    <!-- Modal -->
    <div class="modal fade" id="registerModal" role="dialog">
        <div class="modal-dialog">
            
        <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Form Register</h4>
                </div>
                <div class="modal-body">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input id="first_name" v-model="first_name" type="text" class="form-control" name="first_name" placeholder="First Name">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input id="last_name" v-model="last_name" type="text" class="form-control" name="last_name" placeholder="Last Name">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                        <input id="email" v-model="email" type="email" class="form-control" name="email" placeholder="Email">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input id="password" v-model="password" type="password" class="form-control" name="password" placeholder="Password">
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-info" data-dismiss="modal" @click="userRegister">Register</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    },
    methods: {
        userRegister: function(){
            axios.post('http://localhost:4000/users/register', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password
            })
            .then((response) => {
                console.log('===========MASUK',response)
                console.log('===========PESAN',response.data.message)
                if(response.status == 200){
                    localStorage.setItem('userId', response.data.data.id)
                    localStorage.setItem('email', response.data.data.email)
                    localStorage.setItem('token', response.data.data.token)
                    localStorage.setItem('name', response.data.data.name)
                    // location.reload()
                    alert('Register Success')
                    window.location.href="home.html"
                } else {
                    alert('Register Failed')
                }
                
            })
            .catch((err, response) => {
                console.log(err)
            })
        }
    }

})