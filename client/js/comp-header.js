Vue.component('todo-header', {
    props: ['datauser'],
    template: `
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">To Do Fancy</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="home.html" v-if="!datauser">Home</a></li>
                
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <button type="button" v-if="datauser.email" class="btn btn-default btn-sm"> email: <span class="badge"> {{datauser.email}} </span></button>
                <fb:login-button v-if="!datauser.userId" scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
                <button type="button" v-if="!datauser.userId" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#registerModal">Register</button>
                <button type="button" v-if="!datauser.userId" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#loginModal" >Login</button>
                <button type="button" v-if="datauser.email" @click="userLogout" class="btn btn-danger navbar-btn">Logout</button>
            </ul>
        </div>
    </nav>`,

    methods: {
        userLogout: function(){
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('userId')
            window.location.href="index.html"
        }
    }
    
})