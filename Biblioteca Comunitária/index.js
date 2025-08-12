let users = JSON.parse(localStorage.getItem("users")) || {};
let userBooks = JSON.parse(localStorage.getItem("userBooks")) || {};
let currentUser = localStorage.getItem("currentUser") || null;

const livrosDisponiveis = [
  {
    id: 1,
    titulo: "Lugares Escuros",
    autor: "Gillian Flynn",
    genero: "Suspense Psicológico",
    descricao:
      "Libby Day, uma mulher traumatizada pelo assassinato de sua família, é forçada a revisitar o passado quando um grupo de entusiastas de crimes reais a questiona sobre o crime.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/61txsuGky4L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    titulo: "Garotas em Chamas",
    autor: "C. J. Tudor",
    genero: "Terror",
    descricao:
      "Uma reverenda se muda com a filha para uma cidade pequena e descobre que o local esconde uma lenda sombria sobre garotas em chamas, revelando segredos aterrorizantes do passado.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/91hnRlcVHPL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 3,
    titulo: "O Homem de Giz",
    autor: "C. J. Tudor",
    genero: "Suspense",
    descricao:
      " O livro segue um grupo de amigos que, na infância, seguia desenhos de giz que levavam a descobertas macabras. Anos depois, um novo desenho de giz reabre um mistério do passado.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/91o6FMAy8UL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 4,
    titulo: "Sharp Objects",
    autor: "Gillian Flynn",
    genero: "Suspense Psicológico",
    descricao:
      "Uma repórter com problemas pessoais retorna à sua cidade natal para cobrir o assassinato de duas jovens. Ela precisa confrontar seus próprios traumas enquanto investiga o crime.",
    imagemUrl:
      "https://m.media-amazon.com/images/M/MV5BYTY4OTQ0N2EtMDExMC00NTYzLTk0NmItYTRjNDYxOWU5ZDY3XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 5,
    titulo: "Leviatã",
    autor: "Thomas Hobbes",
    genero: "Filosofia Política",
    descricao:
      "Publicada em 1651, a obra é um dos tratados mais influentes da história da filosofia, discutindo a estrutura da sociedade e a necessidade de um contrato social para evitar o caos.",
    imagemUrl:
      "https://http2.mlstatic.com/D_NQ_NP_983540-MLU69037970178_042023-O.webp",
  },
  {
    id: 6,
    titulo: "O Príncipe",
    autor: "Nicolau Maquiavel",
    genero: "Filosofia Política",
    descricao:
      "Escrito no século XVI, o livro é um guia sobre como os governantes devem conquistar, manter e exercer o poder, abordando a política de forma pragmática e realista.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/71VSAeGixmL._UF894,1000_QL80_.jpg",
  },
  {
    id: 7,
    titulo: "As mil partes do meu coração",
    autor: "Colleen Hoover",
    genero: "Romance",
    descricao:
      "Merit Voss, cansada dos segredos de sua família disfuncional, decide que vai desaparecer, mas antes, planeja revelar todas as verdades que a família esconde.",
    imagemUrl: "https://m.media-amazon.com/images/I/814pUv-EGbL.jpg",
  },
  {
    id: 8,
    titulo: "Ed e Lorraine Warren",
    autor: "Gerald Brittle",
    genero: "Biografia",
    descricao:
      "Uma biografia detalhada sobre a vida e os casos mais famosos de Ed e Lorraine Warren, o casal de demonologistas mais conhecido do mundo.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/91Cu2hkpMlL._UF894,1000_QL80_.jpg",
  },
  {
    id: 9,
    titulo: "Frio do Além",
    autor: "Charlaine Harris",
    genero: "Ficção Científica",
    descricao:
      "Harper Connelly, uma detetive com a habilidade de sentir a causa da morte de pessoas, investiga o caso de um assassino em série que torturou e matou garotos.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/91VagCO+6UL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 10,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    genero: "Ficção Científica",
    descricao:
      "Numa sociedade futurista, livros são proibidos e queimados. O protagonista, Guy Montag, é um bombeiro que tem o trabalho de incinerar livros e que, um dia, começa a questionar seu papel.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/51tAD6LyZ-L._UF1000,1000_QL80_.jpg",
  },
  {
    id: 11,
    titulo: "Tartarugas até lá embaixo",
    autor: "John Green",
    genero: "Romance",
    descricao:
      "A protagonista Aza Holmes lida com transtornos psicológicos enquanto tenta resolver o mistério do desaparecimento de um bilionário.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/81jO4GHLmuL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 12,
    titulo: "Não chore, não",
    autor: "Mary Kubica",
    genero: "Suspense Psicológico",
    descricao:
      "A vida de Quinn muda quando sua colega de quarto, Esther, desaparece misteriosamente, deixando para trás uma carta intrigante. Enquanto tenta descobrir o que aconteceu, Quinn percebe que talvez não conhecesse a amiga tão bem quanto pensava.",
    imagemUrl:
      "https://m.media-amazon.com/images/I/912SIZfykfL._UF1000,1000_QL80_.jpg",
  },
];

function createBookCard(livro, isEstante = false) {
  const isInEstante =
    userBooks[currentUser] &&
    userBooks[currentUser].some((l) => l.id === livro.id);
  const isLido = isInEstante
    ? userBooks[currentUser].find((l) => l.id === livro.id).lido
    : false;

  const actionButton = isEstante
    ? `<button class="btn btn-outline-danger btn-sm" onclick="removeFromEstante(${livro.id})">
               <i class="bi bi-trash"></i> Remover
           </button>`
    : `<button class="btn btn-primary btn-sm" onclick="addToEstante(${
        livro.id
      })" ${isInEstante ? "disabled" : ""}>
               <i class="bi bi-plus-circle"></i> Adicionar à Estante
           </button>`;

  const lidoBadge = isLido
    ? `<span class="badge bg-success estante-badge"><i class="bi bi-check-circle"></i> Lido</span>`
    : "";

  const toggleLidoButton = isEstante
    ? `<div class="form-check mt-2">
               <input class="form-check-input" type="checkbox" id="lido-${
                 livro.id
               }" ${isLido ? "checked" : ""} onclick="toggleLido(${livro.id})">
               <label class="form-check-label" for="lido-${livro.id}">
                   Marcar como lido
               </label>
           </div>`
    : "";

  return `
        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card book-card h-100 position-relative shadow-sm">
                ${lidoBadge}
                <img src="${livro.imagemUrl}" class="card-img-top book-cover" alt="Capa do Livro ${livro.titulo}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${livro.titulo}</h5>
                    <p class="card-text text-muted mb-2"><strong>Autor:</strong> ${livro.autor}</p>
                    <span class="badge bg-secondary mb-2">${livro.genero}</span>
                    <p class="card-text mt-auto">${livro.descricao}</p>
                    <div class="mt-3">
                        ${actionButton}
                        ${toggleLidoButton}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadBooks() {
  const booksList = document.getElementById("booksList");
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const genreFilter = document.getElementById("genreFilter").value;

  const livrosFiltrados = livrosDisponiveis.filter((livro) => {
    const tituloMatch = livro.titulo.toLowerCase().includes(searchInput);
    const generoMatch = !genreFilter || livro.genero === genreFilter;
    return tituloMatch && generoMatch;
  });

  if (livrosFiltrados.length === 0) {
    booksList.innerHTML = `<div class="col-12 text-center"><p class="text-muted">Nenhum livro encontrado.</p></div>`;
    return;
  }

  booksList.innerHTML = "";
  livrosFiltrados.forEach((livro) => {
    booksList.innerHTML += createBookCard(livro);
  });
}

function loadEstante() {
  const estanteList = document.getElementById("estanteList");
  const livrosDoUsuario = userBooks[currentUser] || [];

  if (livrosDoUsuario.length === 0) {
    estanteList.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="bi bi-bookmark"></i>
                    Sua estante está vazia. Adicione alguns livros do catálogo!
                </div>
            </div>
        `;
    return;
  }

  estanteList.innerHTML = "";
  livrosDoUsuario.forEach((livro) => {
    estanteList.innerHTML += createBookCard(livro, true);
  });
}

function updateBookCount() {
  const count = userBooks[currentUser] ? userBooks[currentUser].length : 0;
  const countText =
    count === 1 ? "1 livro na estante" : `${count} livros na estante`;
  document.getElementById("bookCount").textContent = countText;
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (users[username]) {
    if (users[username] === password) {
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      showMainApp();
    } else {
      alert("Senha incorreta! Tente novamente.");
    }
  } else {
    users[username] = password;
    userBooks[username] = [];

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userBooks", JSON.stringify(userBooks));
    localStorage.setItem("currentUser", username);

    currentUser = username;
    alert("Conta criada com sucesso! Bem-vindo à Biblioteca Digital!");
    showMainApp();
  }
}

function showMainApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");

  loadBooks();
  loadEstante();
  updateBookCount();
}

function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    currentUser = null;
    localStorage.removeItem("currentUser");

    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("mainApp").classList.add("hidden");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

function addToEstante(livroId) {
  const livro = livrosDisponiveis.find((l) => l.id === livroId);
  if (!livro) return alert("Livro não encontrado!");

  if (!userBooks[currentUser]) {
    userBooks[currentUser] = [];
  }

  const livroComStatus = { ...livro, lido: false };
  userBooks[currentUser].push(livroComStatus);

  localStorage.setItem("userBooks", JSON.stringify(userBooks));

  loadBooks();
  loadEstante();
  updateBookCount();

  alert(`"${livro.titulo}" foi adicionado à sua estante!`);
}

function removeFromEstante(livroId) {
  if (confirm("Tem certeza que deseja remover este livro da sua estante?")) {
    userBooks[currentUser] = userBooks[currentUser].filter(
      (livro) => livro.id !== livroId
    );

    localStorage.setItem("userBooks", JSON.stringify(userBooks));

    loadBooks();
    loadEstante();
    updateBookCount();
  }
}

function toggleLido(livroId) {
  const livro = userBooks[currentUser].find((l) => l.id === livroId);
  if (livro) {
    livro.lido = !livro.lido;
    localStorage.setItem("userBooks", JSON.stringify(userBooks));
    loadEstante();
  }
}

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");
  const isDark = body.getAttribute("data-theme") === "dark";

  if (isDark) {
    body.removeAttribute("data-theme");
    themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    localStorage.setItem("theme", "dark");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    toggleTheme();
  }

  if (currentUser) {
    showMainApp();
  }

  document.getElementById("searchInput").addEventListener("input", loadBooks);
  document.getElementById("genreFilter").addEventListener("change", loadBooks);

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
});
