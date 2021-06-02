const baseURL = "https://api.github.com";

const form = document.querySelector('form');
const input = document.querySelector('#userName');
const imagemErro = document.querySelector('#imagemErro');
const imgPersonagem = document.querySelector('#imagem');
const userName = document.querySelector('#name');
const apelidPersonagem = document.querySelector('#nickname');
const bioUser = document.querySelector('#bio');
const repos = document.querySelector('#repos');
const followers = document.querySelector('#followers');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = input.value.trim();

  if(nome){
    getUsername(nome)
  } else {
    alert('Informe um username');
  }
})

const getUsername = (nome) => {

  fetch(`${baseURL}/users/${nome}`)
  .then((resposta) => resposta.json())
  .then((dados) => {
    if (!dados.message) {
        limparCard();
      const avatar_url = dados.avatar_url;
      const name = dados.name;
      const nickname = dados.login
      const followers = dados.followers;
      const bio = dados.bio;
      const repos = dados.public_repos;
      criarCard(avatar_url, name, followers, bio, nickname, repos)
  } else {
      throw new Error()
    }
  }).catch((e) => {
    limparCard();
    imagemErro.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png');
  })

}

const criarCard = (avatar_url, name, followers, bio, nickname, repos) => {
 imgPersonagem.setAttribute('src', avatar_url);
 userName.textContent = name;
 apelidPersonagem.textContent = `@${nickname}`;
 bioUser.textContent = `${bio}`;
 repos.textContent = `${repos}`;
 followers.textContent = `${followers}`

}

const limparCard = () => {
 imagemErro.src = ' ';
 imgPersonagem.src = ' ';
 userName.textContent = '';
 apelidPersonagem.textContent = '';
 bioUser.textContent = '';
 repos.textContent = '';
}