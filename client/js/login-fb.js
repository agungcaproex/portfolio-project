
// This is called with the results from from FB.getLoginStatus().

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log('RESPON FB=====',response);
    if (response.status === 'connected') {
      // testAPI();
      axios({
        method: 'post',
        url: 'http://localhost:4000/users/loginfb',
        headers: {
          fb_token: response.authResponse.accessToken
        }
      })
      .then((res) => {
        localStorage.setItem('userId', res.data.data.id)
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('email', res.data.data.email)
        localStorage.setItem('name', res.data.data.name)
        location.reload()
      })


    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '889762984560167',
      cookie     : true,   
      xfbml      : true,  
      version    : 'v2.8' 
    });


    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }