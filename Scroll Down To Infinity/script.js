const container = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
let limit = 3;
let page = 1;

async function getpost()
{
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_pages=${page}`);

    const data = await res.json();

    return data;
}

async function showpost()
{
    const posts = await getpost();
    posts.forEach ( post => {
        const postElmentlist = document.createElement('div');
        postElmentlist.classList.add('post');
        postElmentlist.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class = "post-title" >${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `;
       container.appendChild(postElmentlist);
    });
}


function showLoading()
{
    loading.classList.add('show');

    setTimeout(() => { loading.classList.remove('show');}, 1000)
    
    setTimeout(() => {
        page++;
        showpost();
        }, 300);

    
}

function filterpost(e)
{
    const term = e.target.value.toUpperCase();
    const posts = document.querySelector('.post');

    posts.forEach(post => 
    {
        const title = post.quarSelector('.post-title').innerText.toUpperCase();
        const body = post.quarSelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1)
        {
            post.style.display - 'flex';
        }
        else {
            post.style.display = 'none';
        }
        })
}
showpost();
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});