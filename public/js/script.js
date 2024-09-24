const $ = el => document.querySelector(el)

const loginForm = $('#login-form')
const loginSpan = $('#login-form span')

const registerForm = $('#register-form')
const registerSpan = $('#register-form span')

const logoutButton = $('#close-session')

loginForm?.addEventListener('submit', e => {
  e.preventDefault()
  const username = $('#login-username').value
  const password = $('#login-password').value

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => {
    if (res.ok) {
      loginSpan.innerText = 'Sesión iniciada... Entrando ...'
      loginSpan.style.color = 'green'
      setTimeout(() => {
        window.location.href = '/protected'
      }, 2000)
    } else {
      loginSpan.innerText = 'Error al iniciar sesión'
      loginSpan.style.color = 'red'
    }
  })
})

registerForm?.addEventListener('submit', e => {
  e.preventDefault()
  const username = $('#register-username').value
  const password = $('#register-password').value
  const confirmPassword = $('#register-confirm-password').value

  if (password !== confirmPassword) {
    registerSpan.innerText = 'Las contraseñas no coinciden'
    registerSpan.style.color = 'red'
    return
  }

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => {
    if (res.ok) {
      registerSpan.innerText = 'Usuario registrado'
      registerSpan.style.color = 'green'
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } else {
      registerSpan.innerText = 'Error al registrar usuario'
      registerSpan.style.color = 'red'
    }
  })
})

logoutButton?.addEventListener('click', e => {
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    window.location.href = '/'
  })
})
