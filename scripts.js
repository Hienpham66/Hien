




let balance = 0; // Số dư ban đầu

window.onload = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        const username = localStorage.getItem('currentUser');
        document.getElementById('welcomeMessage').innerText = `Xin chào bạn ${username}, đã đến với trang web của Hiển!`;
        balance = parseInt(localStorage.getItem(`${username}_balance`), 10) || 0; // Đọc số dư từ localStorage
        updateBalanceDisplay();
    }
};

function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];

    const user = userAccounts.find(account => account.username === username && account.password === password);

    if (user) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        balance = user.balance; // Đọc số dư từ tài khoản người dùng
        updateBalanceDisplay();
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

    const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];

    if (userAccounts.some(account => account.username === username)) {
        alert('Tên đăng nhập đã được sử dụng! Vui lòng nhập tên khác.');
    } else if (username && password && password === passwordConfirm) {
        // Thêm tài khoản mới vào danh sách
        userAccounts.push({ username, password, balance: 0 }); // Khởi tạo số dư là 0
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts)); // Lưu danh sách tài khoản
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
        const username = localStorage.getItem('currentUser');
        const userAccounts = JSON.parse(localStorage.getItem('userAccounts'));
        const user = userAccounts.find(account => account.username === username);
        user.balance = balance; // Cập nhật số dư trong tài khoản người dùng
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts)); // Lưu danh sách tài khoản
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
    localStorage.removeItem('currentUser');
    location.reload();
}
