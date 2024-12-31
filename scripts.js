
window.onload = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Xin chào bạn ${localStorage.getItem('username')}, đã đến với trang web của Hiển!`;
    }
};

function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (username === savedUsername && password === savedPassword) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Xin chào bạn ${username}, đã đến với trang web của Hiển!`;
    } else {
        alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
}

function handleSignup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    const savedUsername = localStorage.getItem('username');

    if (username === savedUsername) {
        alert('Tên đăng nhập đã được sử dụng! Vui lòng nhập tên khác.');
    } else if (username && password && password === passwordConfirm) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Đăng ký thành công!');
        showLogin();
    } else if (password !== passwordConfirm) {
        alert('Mật khẩu không khớp! Vui lòng kiểm tra lại.');
    } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
    }
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('signupPassword');
    const passwordConfirmField = document.getElementById('signupPasswordConfirm');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    
    passwordField.type = type;
    passwordConfirmField.type = type;
}

function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function showDeposit() {
    alert('Chức năng nạp tiền sẽ được triển khai.');
}

function showTransfer() {
    alert('Chức năng chuyển khoản sẽ được triển khai.');
}

function showSignup() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'flex';
}

function showLogin() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    location.reload();
}
