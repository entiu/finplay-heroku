function togglePass() {
    var pass1 = document.getElementById('pass-1');
    var pass2 = document.getElementById('pass-2');
    if(pass1.type === "password") {
        pass1.type = "text";
        pass2.type = "text";
    } else {
        pass1.type = "password";
        pass2.type = "password";
    }
}

function togglePassLogIn() {
    var password = document.getElementById('password');
    if(password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function hideErrors() {
    errors = document.getElementById('errors');
    errors.style.display = "none";
}

function Story(title, content) {
    this.content = content;
    this.title = '<h2 class="story-title">' + title + '</h2>';
    this.page = 0;
    this.page_content = '';
    this.pages = 0;
    
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var vmax;
    if(vw > vh) {
        vmax = vw;
    } else {
        vmax = vh;
    }
    var page_surface = vh * 0.85 * vw * 0.9; // both set in style.css at .page {...}
    var char_surface = vmax * 0.025 * vmax * 0.025 * 0.7; // height set in style.css at :root {...} * average width of a characer
    this.page_chars = page_surface / char_surface;

    // On init
    this.pages = Math.ceil(this.content.length / this.page_chars);
    this.page_content = this.content.substr(this.page * this.page_chars, this.page_chars);

    document.getElementById('page').innerHTML = this.title + this.page_content;
    document.getElementById('page-counter').innerHTML = (this.page + 1) + '/' + this.pages;
    document.getElementById('bar-read').style.width = ((this.page + 1) / this.pages) * vw * 0.7;
    document.getElementById('percentage').innerHTML = (Math.floor(((this.page + 1) / this.pages) * 100)) + '%';
    
    showTopBar = function() {
        document.getElementById('top-bar').style.top = 0;
    }

    hideTopBar = function() {
        document.getElementById('top-bar').style.top = -128;
    }

    this.next = function(p = this){
        if(p.page < p.pages - 1){
            p.page += 1;
            this.page_content = this.content.substr(this.page * this.page_chars, this.page_chars);
            document.getElementById('page').innerHTML = this.page_content;
            document.getElementById('page-counter').innerHTML = (this.page + 1) + '/' + this.pages;
            document.getElementById('bar-read').style.width = ((this.page + 1) / this.pages) * vw * 0.7;
            document.getElementById('percentage').innerHTML = (Math.floor(((this.page + 1) / this.pages) * 100)) + '%';
        }
        if(p.page == p.pages - 1) {
            document.getElementById('page').innerHTML = this.page_content + '<br><button class="game-btn"><a href="breakout.php">Let\'s play!</a></button>';
        }
        hideTopBar();
    }

    this.prev = function(p = this){
        if(p.page > 0){
            p.page -= 1;
            this.page_content = this.content.substr(this.page * this.page_chars, this.page_chars);
            if(p.page == 0){
                document.getElementById('page').innerHTML = this.title + this.page_content;
            } else {
                document.getElementById('page').innerHTML = this.page_content;
            }
            document.getElementById('page-counter').innerHTML = (this.page + 1) + '/' + this.pages;
            document.getElementById('bar-read').style.width = ((this.page + 1) / this.pages) * vw * 0.7;
            document.getElementById('percentage').innerHTML = (Math.floor(((this.page + 1) / this.pages) * 100)) + '%';
        }
        hideTopBar();
    }
}