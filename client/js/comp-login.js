Vue.component('todo-login', {
    template: `
    <!-- Modal -->
    <div class="modal fade" id="loginModal" role="dialog">
        <div class="modal-dialog">
            
        <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Form Login</h4>
                </div>
                <div class="modal-body">
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
                <button type="button" class="btn btn-info" data-dismiss="modal" @click="userLogin">Login</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data: {
        email: '',
        password: ''
    },
    methods: {
        userLogin: function(){
            axios.post('http://localhost:4000/users/login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                console.log('===========MASUK',response)
                if(response.status == 200){
                    localStorage.setItem('userId', response.data.data.id)
                    localStorage.setItem('email', response.data.data.email)
                    localStorage.setItem('token', response.data.data.token)
                    localStorage.setItem('name', response.data.data.name)
                    // location.reload()
                    alert('Login Success')
                    window.location.href="home.html"
                } else {
                    alert('Login Failed')
                }
                
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

})