function register() {
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const registerError = document.getElementById("register-error");

    if (!email || !password) {
        registerError.textContent = "Vui lòng điền đủ thông tin.";
        return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    alert("Đăng ký thành công!");
}

function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const loginError = document.getElementById("login-error");

    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (!email || !password) {
        loginError.textContent = "Vui lòng điền đủ thông tin.";
        return;
    }

    if (email === savedEmail && password === savedPassword) {
        alert("Đăng nhập thành công!");
        document.getElementById("auth-section").style.display = "none";
        document.querySelector(".profile-container").style.display = "block";
    } else {
        loginError.textContent = "Email hoặc mật khẩu không đúng!";
    }
}

function sendResetCode() {
    const email = document.getElementById("forgot-email").value.trim();
    const forgotError = document.getElementById("forgot-error");

    if (email !== localStorage.getItem('email')) {
        forgotError.textContent = "Email không tồn tại trong hệ thống!";
        return;
    }

    localStorage.setItem("resetCode", "123456");
    alert("Mã xác minh đã được gửi đến email của bạn!");
}

function resetPassword() {
    const resetCode = document.getElementById("reset-code").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const resetError = document.getElementById("reset-error");

    if (resetCode !== localStorage.getItem("resetCode")) {
        resetError.textContent = "Mã xác minh không đúng!";
        return;
    }

    localStorage.setItem("password", newPassword);
    alert("Mật khẩu của bạn đã được cập nhật thành công!");
}
