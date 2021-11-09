var user = {
    profile: null,
    loggedIn: false
}
if (localStorage.getItem('fakebookSetupData')) {
    user.loggedIn = true
    user.profile = JSON.parse(localStorage.getItem('fakebookSetupData'))
        //localStorage.removeItem('fakebookSetupData')
    loadApp([{
        author: "Fakebook Admin",
        pfp: "fakebook.png",
        date: "Today",
        content: "Welcome to Fakebook! I hope you enjoy this 100% client-side application. Also 100% fake but who cares? It looks the same!"
    }], 'yea')
}
if (user.loggedIn === false) requestLogIn()

function requestLogIn() {
    let modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.innerHTML = `<h1>Log In</h1>
    <input placeholder="Username">
    <input placeholder="Password">
    <button onclick="evaluateLogIn(this.previousElementSibling)">Log in</button>`
    document.body.appendChild(modal)
    document.body.classList.add('overlayed')
}

function evaluateLogIn(password) {
    let realPassword = user.profile.password
    let comparingPassword = md5(password.value)
    console.log(realPassword + '\n' + comparingPassword)
    if (realPassword === comparingPassword) console.log('LOGIN SUCCESSFUL')
}

function Navbar() {
    let html = `
        <nav>
            <div>Home</div>
            <div>Search</div>
            <div>News</div>
            <div>About</div>
        </nav>
            `
    this.appendTo = function(toAppendTo) {
        toAppendTo.innerHTML += html
    }
}

function Topbar() {
    let html = `
    <div class="top-bar">
        <div>
        <img src="fakebook.png">
        <input placeholder="Search Fakebook...">
        </div>
        <div>
        <button discouraged>Log in</button>
        <button>Sign up</button>
        </div>
    </div>
    `
    this.appendTo = function(toAppendTo) {
        toAppendTo.innerHTML += html
    }
}

function Posts(posts) {
    let posthtml = ``
    for (let i = 0; i < posts.length; i++) {
        posthtml += `
        <div class="post">
        <img src="${posts[i].pfp}">
        <div>  
            <h3>${posts[i].author} <span>${posts[i].date}</span></h3>
            <p>${posts[i].content}</p>
        </div>
        `
    }
    let html = `
    <div class="posts">${posthtml}</div>`
    this.appendTo = function(toAppendTo) {
        toAppendTo.innerHTML += html
    }
}

function NewsColumn(news) {
    let html = `
    <div class="news">${news}</div>`
    this.appendTo = function(toAppendTo) {
        toAppendTo.innerHTML += html
    }
}

function App(obj) {
    document.querySelector('.loader').remove()
    document.querySelector('#loader').remove()
    let app = document.createElement('DIV')
    app.classList.add('app')
    let topbar = new Topbar()
    topbar.appendTo(app)

    let navbar = new Navbar()
    navbar.appendTo(app)

    let vposts = new Posts(obj.posts)
    vposts.appendTo(app)



    this.initialize = function() {
        document.body.appendChild(app)
    }
}


function loadApp(posts, news) {
    let app = new App({
        posts: posts,
        news: news
    })
    app.initialize()
}
