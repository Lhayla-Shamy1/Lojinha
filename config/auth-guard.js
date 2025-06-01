// Para páginas que só podem ser acessadas se estiver logado
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../index.html";
    }
})