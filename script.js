(function() {
    emailjs.init("rbQ0ILUyu2HIcCioh");  // Public Key từ EmailJS
})();

function sendVerificationCode() {
    const email = document.getElementById('forgot-email').value;  // Lấy email người dùng nhập
    if (!email) {
        document.getElementById('message').innerText = 'Vui lòng nhập email của bạn.';
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000); // Tạo mã ngẫu nhiên 6 chữ số

    const templateParams = {
        to_email: email,  // Email của người nhận
        code: code         // Mã xác minh
    };

    emailjs.send("service_2qg399z", "template_u1lcbi6", templateParams)
        .then((response) => {
            document.getElementById('message').innerText = 'Mã xác minh đã được gửi đến email của bạn.';
            console.log('Email gửi thành công!', response.status, response.text);
        }, (error) => {
            document.getElementById('message').innerText = 'Có lỗi xảy ra khi gửi email.';
            console.error('Gửi email thất bại:', error);
        });
}
