async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido");
        return;
    }
    try {
        const btn = document.querySelector('.login-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        await firebase.auth().signInWithEmailAndPassword(email, password);

        console.log("Usuário logado com sucesso");
    } catch (error) {
        console.error("Erro no login:", error);

        const btn = document.querySelector('.login-btn');
        const code = error.code;
        
        btn.disabled = false;
        btn.textContent = 'Login';
        // Mensagens de erro
        const errorMessages = {
            'auth/wrong-password': 'Senha incorreta',
            'auth/user-not-found': 'Usuário não encontrado',
            'auth/invalid-email': 'E-mail inválido'
        };

        alert(errorMessages[code] || 'Erro ao fazer login');
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../index.html";
    }
})

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}