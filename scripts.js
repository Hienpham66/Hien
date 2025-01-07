
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

        // Hiển thị video toàn màn hình
        const welcomeVideo = document.getElementById('welcomeVideo');
        welcomeVideo.style.display = 'block';

        // Ẩn màn hình đăng nhập và đợi 5 giây trước khi chuyển đến sản phẩm
        document.getElementById('login').style.display = 'none';
        setTimeout(() => {
            welcomeVideo.style.display = 'none'; // Ẩn video
            document.getElementById('content').style.display = 'block'; // Hiện phần sản phẩm
            document.getElementById('welcomeMessage').innerText = `Xin chào bạn ${username}, đã đến với trang web của Hiển!`;
        }, 5000); // 5000 milliseconds = 5 seconds
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

// Hàm tìm kiếm sản phẩm
function searchProduct() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const title = item.querySelector('h3').innerText.toLowerCase();
        if (title.includes(query)) {
            item.style.display = 'block'; // Hiển thị sản phẩm nếu tìm thấy
        } else {
            item.style.display = 'none'; // Ẩn sản phẩm nếu không tìm thấy
        }
    });
}

// Chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    if (!userMessage.trim()) return;

    // Hiển thị tin nhắn người dùng
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<div style="color: white;">Bạn: ${userMessage}</div>`;

    // Giả lập phản hồi từ chatbot
    const botResponse = getChatbotResponse(userMessage);
    chatMessages.innerHTML += `<div style="color: #34e89e;">Chatbot: ${botResponse}</div>`;

    // Cuộn xuống tin nhắn cuối cùng
    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.getElementById('userMessage').value = ''; // Xóa input
}

function sendSuggestion(suggestion) {
    document.getElementById('userMessage').value = suggestion; // Điền gợi ý vào ô nhập
    sendMessage(); // Gửi tin nhắn
}

function redirectToFacebook() {
    const countdownElement = document.createElement('div');
    countdownElement.style.color = '#34e89e';
    countdownElement.innerText = "Chuyển hướng trong 3 giây...";
    document.getElementById('chatMessages').appendChild(countdownElement);

    let countdown = 3; // Thời gian đếm ngược
    const interval = setInterval(() => {
        countdown--;
        countdownElement.innerText = `Chuyển hướng trong ${countdown} giây...`;
        if (countdown <= 0) {
            clearInterval(interval);
            window.location.href = "https://www.facebook.com/hienpham192008?mibextid=ZbWKwL"; // Chuyển hướng tới Facebook
        }
    }, 1000); // Thay đổi mỗi 1 giây
}

function getChatbotResponse(message) {
    const username = localStorage.getItem('currentUser') || "bạn"; // Lấy tên người dùng từ localStorage
    const responses = {
        "xin chào": "Xin chào! Tôi có thể giúp gì cho bạn?",
        "giá sản phẩm": "Giá sản phẩm dao động từ 350k đến 500k.",
        "cảm ơn": "Không có gì! Nếu bạn có thêm câu hỏi, hãy hỏi tôi.",
        "bạn là ai": `Tôi là Hiển, bạn cần tôi giúp gì hả ${username}?`,
        "giúp tôi với": "Tôi ở đây để giúp bạn! Hãy cho tôi biết bạn cần gì.",
        "thời gian mở cửa": "Chúng tôi mở cửa từ 8h sáng đến 10h tối.",
        "liên hệ": "Bạn có thể liên hệ với chúng tôi qua email: contact@example.com.",
        "có sản phẩm mới không": "Có, chúng tôi thường xuyên cập nhật sản phẩm mới. Hãy kiểm tra trang chủ để biết thêm chi tiết!",
        "hình thức thanh toán": "Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ ngân hàng và chuyển khoản.",
        "chính sách hoàn trả": "Bạn có thể hoàn trả sản phẩm trong vòng 7 ngày nếu không hài lòng.",
        "giờ làm việc": "Chúng tôi làm việc từ Thứ Hai đến Chủ Nhật, từ 8h sáng đến 10h tối.",
        "giảm giá": "Chúng tôi thường có các chương trình giảm giá vào dịp lễ hoặc cuối tháng.",
        "tìm kiếm sản phẩm": "Bạn có thể sử dụng thanh tìm kiếm ở trên cùng để tìm sản phẩm bạn muốn.",
        "mua hàng": "Để mua hàng, hãy nhấn vào nút 'Mua ngay' bên dưới sản phẩm.",
        "facebook": "Chuyển hướng tới Facebook...",
    };

    return responses[message.toLowerCase()] || "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể thử hỏi lại!";
}
