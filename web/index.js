let token = '';
let id = 0;
const URL_GLOBAL = 'http://127.0.0.1/api-sanctum/public/api';
const $divLogin = document.getElementById('divLogin');
const $content = document.getElementById('content');

// Ventana Modal
const titulo = document.getElementById('titulo');
const enlace = document.getElementById('enlace');
const contenido = document.getElementById('contenido');

// Método AuthController@login
async function login() {
  let url = `${URL_GLOBAL}/login`;
  let data = {
    email: 'prueba@gmail.com',
    password: 'M13rc0l3$',
    device_name: 'myApp'
  };
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let result = await response.json();
    token = result.token;
    loginExitoso(token);
  } catch (error) {
    console.error(error);
  }
}

function loginExitoso(token) {
  html = `
  <div class="alert alert-primary">
    Login exitoso!<br />
    Su Token de Autenticación es ${token}
  </div>
  <button type="button" class="btn btn-primary btn-block col-3" onclick="indexPost()">Cargar contenido</button>
  `;
  $divLogin.innerHTML = html;
}

// Método PostController@index - Trae todas las registros
async function indexPost() {
  console.log("Mostrar Contenido");
  let url = `${URL_GLOBAL}/post`;
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    let result = await response.json();
    // console.log('result:', result);
    dibujarContenido(result);
  } catch (error) {
    console.error(error);
  }
}

function dibujarContenido(result) {
  let html = '';
  $divLogin.innerHTML = '';

  for (const item of result) {
    html += `
    <div class="card mb-4">
      <div class="card-body">
        <a href="${item.link}" target="_blank" class="card-title h4">${item.title}</a>
        <p class="card-text fs-5">${item.content}</p>
        <button type="button" class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#blogModal" onclick="activarModal(${item.id})">
          Ver más...
        </button>
      </div>
    </div>
    `;

  }
  html += '<button type="button" class="btn btn-primary btn-block col-3 me-2" data-bs-toggle="modal" data-bs-target="#blogModal" onclick="activarModal(0)">Adicionar entrada</button>';
  html += '<button type="button" class="btn btn-primary btn-block col-3" onclick="logout()">Logout</button>';

  $content.innerHTML = html;
}

function activarModal(codigo) {
  id = codigo;
  titulo.value = '';
  enlace.value = '';
  contenido.value = '';
  btnCargar = document.getElementById('btnCargar');
  btnGrabar = document.getElementById('btnGrabar');

  if (id == 0) {
    btnGrabar.setAttribute('onclick', 'createPost()');
    btnCargar.disabled = true;
  } else {
    btnGrabar.setAttribute('onclick', 'updatePost()');
    btnCargar.disabled = false;
  }
}

// Método PostController@create - Crea un nuevo registro
async function createPost() {
  let url = `${URL_GLOBAL}/post`;
  let data = {
    title: titulo.value,
    link: enlace.value,
    content: contenido.value,
  };
  console.log(data);
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    // console.log(result);
    indexPost();
  } catch (error) {
    console.error(error);
  }
}

// Método PostController@show - Trae la información de un solo registro
async function showPost() {
  let url = `${URL_GLOBAL}/post/${id}`;
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    let result = await response.json();
    titulo.value = result.title;
    enlace.value = result.link;
    contenido.value = result.content;
  } catch (error) {
    console.error(error);
  }
}

// Método PostController@update - Trae la información de un solo registro
async function updatePost() {
  let url = `${URL_GLOBAL}/post/${id}`;
  let data = {
    title: titulo.value,
    link: enlace.value,
    content: contenido.value,
  };
  try {
    let response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      // mode: 'cors',
    });
    let result = await response.json();
    // console.log(result);
    indexPost();
  } catch (error) {
    console.error(error);
  }
}

// Método AuthController@logout
async function logout() {
  let url = `${URL_GLOBAL}/logout`;
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    let result = await response.json();
    // dibujarContenido(result);
    // console.log(result);
    $content.innerHTML = '';
    $divLogin.innerHTML = `
    <div class="alert alert-success">
      Logout exitoso!
    </div>
    <button type="button" class="btn btn-primary btn-block col-4 mx-auto" onclick="login()">Login</button>
    `;
  } catch (error) {
    console.error(error);
  }

}
