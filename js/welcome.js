var setupPages = [
    `<h1>Pick a username</h1>
    <p>Something personal and original.</p>
    <input placeholder="Type your fantastic username here.">
    <button onclick="recordData('username',this.previousElementSibling);switchSlides(this.parentElement,setupPages[1])">Next</button>`,

    `<h1>Pick a password</h1>
    <p>Also something personal and original. Easy to remember, but not easy to guess.</p>
    <input type="password" placeholder="Type your fantastic password here.">
    <button onclick="recordData('password',this.previousElementSibling);switchSlides(this.parentElement,setupPages[2])">Next</button>`,

    `<h1>Upload your profile picture</h1>
    <p>This can be literally anything you have on your hard drive.<p>
    <input type="file" onchange="this.parentElement.innerHTML += pfp(this)">
    <a href="#" onclick="switchSlides(this.parentElement,setupPages[3])">Skip and use default profilepicture</a>`,

    `<h1>That's it!</h1>
    <p>We hope you enjoy using FakeBook.</p>
    <a href="social.html"><button>Begin</button></a>`
]

var data = {
    users: [
        {}
    ]
}

function pfp(elem) {
    let file = elem.files[0]
    if (file.size / 1024 / 1024 > 1) return 'Maximum file size is 1MB. Could not upload'
    else {
        recordData('pfp', encodeImageFileAsURL(elem))
        switchSlides(elem.parentElement.parentElement, setupPages[3])
        return 'Uploading...'
    }
}

function recordData(type, toRecord) {
    if (type == 'password') data.users[0][type] = md5(toRecord.value)
    else if (type == 'pfp') data.users[0][type] = toRecord
    else data.users[0][type] = toRecord.value
    localStorage.setItem('fakebookSetupData', JSON.stringify(data))
}

function switchSlides(innercontainer, content) {
    innercontainer.classList.add('modal-transitioning')
    setTimeout(() => {
        innercontainer.innerHTML = content
        innercontainer.classList.remove('modal-transitioning')
    }, 200);
}

function encodeImageFileAsURL(element) {
    var file = element.files[0]
    var reader = new FileReader();
    reader.onloadend = function() {
        console.log(reader.result)
    }
    return reader.readAsDataURL(file);
}
