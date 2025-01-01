


let balance = 0; // Số dư ban đầu

window.onload = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Xin chào bạn ${localStorage.getItem('username')}, đã đến với trang web của Hiển!`;
        balance = parseInt(localStorage.getItem('balance'), 10) || 0; // Đọc số dư từ localStorage
        updateBalanceDisplay();
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
        balance = parseInt(localStorage.getItem('balance'), 10) || 0; // Đọc số dư từ localStorage
        updateBalanceDisplay();
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
        // Lưu thông tin người dùng và khởi tạo số dư
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('balance', balance); // Lưu số dư là 0
        alert('Đăng ký thành công!');
        showLogin();
    } else if (password !== passwordConfirm) {
        alert('Mật khẩu không khớp! Vui lòng kiểm tra lại.');
    } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
    }
}

function updateBalanceDisplay() {
    document.getElementById('balanceAmount').innerText = balance;
}

function handlePurchase(productPrice) {
    if (balance >= productPrice) {
        balance -= productPrice;
        localStorage.setItem('balance', balance); // Cập nhật số dư trong localStorage
        updateBalanceDisplay();
        alert('Mua hàng thành công!');
    } else {
        alert('Không đủ số dư để thực hiện giao dịch!');
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

function showDepositInfo() {
    document.getElementById('productContainer').style.display = 'none'; // Ẩn sản phẩm
    document.getElementById('depositInfo').style.display = 'block'; // Hiện thông tin nạp tiền
}

function hideDepositInfo() {
    document.getElementById('depositInfo').style.display = 'none'; // Ẩn thông tin nạp tiền
    document.getElementById('productContainer').style.display = 'block'; // Hiện sản phẩm
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
