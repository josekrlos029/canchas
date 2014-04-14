/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

            function facebook(){
                Login();
            }
            
            window.fbAsyncInit = function() {
                FB.init({
                  appId      : '411903142258993',
                  status     : true, // check login status
                  cookie     : true, // enable cookies to allow the server to access the session
                  xfbml      : true  // parse XFBML
                });

          };
  // Load the SDK asynchronously
            (function(d){
             var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement('script'); js.id = id; js.async = true;
             js.src = "//connect.facebook.net/es_ES/all.js";
             ref.parentNode.insertBefore(js, ref);
            }(document));

  
  function Login()
    {
 
        FB.login(function(response) {
           if (response.authResponse) 
           {
                getUserInfo(); // Get User Information.
            } else
            {
             alert('Error al entrar con facebook, intentalo nuevamente, Recuerda: "No publicaremos nada a tu nombre"');
            }
         },{scope: 'email,publish_actions'});
 
    }
  
  function getUserInfo() {
       FB.api('/me', function(response) {
 
        //getPhoto();
        //publicar();
        
        var persona = {idFace:response.id,
                       nombre:response.first_name,
                       apellidos:response.last_name,
                       email:response.email};
        confirmarRegistro(persona);
           
        });
   }
   
   function confirmarRegistro(persona){
       
       $.ajax({
            type: "POST",
            url: "/birrias/administrador/confirmarRegistroFace",
            data: persona
        })
            .done(function( msg ) {
                
                var json = eval("(" + msg + ")");
                if(json === "autenticado"){
                    window.location.href = 'vistas/home.html';
                }else{
                    alert("Bienvenido a la comunidad de Birriososs");
                }
            });
   }
   
   function getPhoto()
    {
      FB.api('/me/picture?type=normal', function(response) {
 
          var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
          document.getElementById("status").innerHTML+=str;
 
    });
 
    }
    
    function publicar(){
            FB.ui(
        {
          method: 'feed',
          name: 'Facebook Dialogs',
          link: 'https://developers.facebook.com/docs/dialogs/',
          picture: 'http://fbrell.com/f8.jpg',
          caption: 'Reference Documentation',
          description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        },
        function(response) {
          if (response && response.post_id) {
            alert('Post was published.');
          } else {
            alert('Post was not published.');
          }
        }
      );  
    }