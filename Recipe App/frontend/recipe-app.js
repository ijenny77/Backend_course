let editingId = null;
// ── TAB SWITCHER ──
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none'
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none'
    event.target.classList.add('active')
    document.getElementById('authError').style.display = 'none'
}
function showError(msg) {
    const el = document.getElementById('authError')
    el.textContent = msg
    el.style.display = 'block'
}
// ── YOUR JAVASCRIPT GOES HERE ──
// LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
        const email = document.getElementById('loginEmail').value
        const password = document.getElementById('loginPassword').value
        const rememberMe = document.getElementById('rememberMe').checked
        const response = await fetch('https://recipe-app-api-zdpd.onrender.com/auth/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password,rememberMe})
        })
        if(response.ok){
            const data = await response.json()
            localStorage.setItem('token', data.token) 
            const userResponse = await fetch('https://recipe-app-api-zdpd.onrender.com/auth/me',{
                headers:{'Authorization':`Bearer ${data.token}`}
            })
            const user = await userResponse.json()
            showDashboard(user.name) 
        }else{
            const error = await response.text()
            alert(error)
        }
})
// REGISTER
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('regName').value
    const email = document.getElementById('regEmail').value
    const password = document.getElementById("regPassword").value
    const confirmPassword = document.getElementById('regConfirmPassword').value
    const response = await fetch('https://recipe-app-api-zdpd.onrender.com/auth/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,email,password,confirmPassword})
    })
    const data = await response.text()
    if(response.ok){
        alert('Accout created successfully!')
        switchTab('login')          
    }else{
        alert("Check your credentials")
    }
})
// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token')
    document.getElementById('dashboard').style.display = 'none'
    document.getElementById('authPage').style.display = 'flex'
})
// LOAD RECIPES
async function loadRecipes() {
    const token = localStorage.getItem('token')
    const response = await fetch('https://recipe-app-api-zdpd.onrender.com/recipes',{
        headers:{'Authorization':`Bearer ${token}`}
    })
    const recipes = await response.json()
    const list = document.getElementById('recipesList')
    if(recipes.length === 0){
        list.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🍽️</div>
            <h3>No recipes yet</h3>
            <p>Add your first recipe above to get started!</p>
        </div>
        `
        return
    }
    list.innerHTML = recipes.map(recipe => `
        <div class='recipe-card'>
            <div class="recipe-card-header">
                <div class="recipe-title">${recipe.title}</div>
                <span class="recipe-time">${recipe.cookingTime}</span>
            </div>
            <div class="recipe-section">
                <div class="recipe-section-label">Ingredients</div>
                <div class="recipe-section-text">${recipe.ingredients}</div>
            </div>
            <div class="recipe-section">
                <div class="recipe-section-label">Instructions</div>
                <ol style="padding-left: 20px; margin-top: 4px;">
                    ${recipe.instructions.split('\n')
                        .filter(step => step.trim() !== '')
                        .map(step => `<li style="font-size:13px; color:#1C1917; margin-bottom:4px;">${step}</li>`)
                        .join('')}
                </ol>
            </div>
            <div class="recipe-actions">
                <button class="btn-delete" onclick="deleteRecipe('${recipe._id}')">Delete</button>
                <button class="btn-edit" onclick="editRecipe('${recipe._id}', '${recipe.title}', '${recipe.cookingTime}', \`${recipe.ingredients}\`, \`${recipe.instructions}\`)">Edit</button>
            </div>
        </div>
    `).join('')
}
document.getElementById('searchInput').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase()
    const cards = document.querySelectorAll('.recipe-card')
    cards.forEach(card => {
        const title = card.querySelector('.recipe-title').textContent.toLowerCase()
        if(title.includes(search)){
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    })
})
// ADD RECIPE
document.getElementById('addRecipeForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const title = document.getElementById('recipeTitle').value
    const cookingTime = document.getElementById('cookingTime').value
    const ingredients = document.getElementById('ingredients').value
    const instructions = document.getElementById('instructions').value
    const url = editingId 
        ? `https://recipe-app-api-zdpd.onrender.com/recipes/${editingId}`  // ← update
        : 'https://recipe-app-api-zdpd.onrender.com/recipes'               // ← create
    const method = editingId ? 'PUT' : 'POST'           // ← method changes too
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, cookingTime, ingredients, instructions })
    })

    if(response.ok){
        editingId = null  // ← reset after updating
        document.getElementById('addRecipeForm').reset()
        document.querySelector('.btn-add').textContent = '+ Add Recipe'  // ← reset button text
        loadRecipes()
    } else {
        alert('Something went wrong')
    }
})  
function editRecipe(id, title, cookingTime, ingredients, instructions) {
    editingId = id
    document.getElementById('recipeTitle').value = title
    document.getElementById('cookingTime').value = cookingTime
    document.getElementById('ingredients').value = ingredients
    document.getElementById('instructions').value = instructions
    document.querySelector('.btn-add').textContent = 'Update Recipe'
    document.querySelector('.add-recipe-card').scrollIntoView({ behavior: 'smooth' })
}
// DELETE RECIPE
async function deleteRecipe(id) {
    const confirmed = confirm('Are you sure you want to delete this recipe?')
    if(!confirmed) return  // ← stops if user clicks Cancel

    const token = localStorage.getItem('token')
    const response = await fetch(`https://recipe-app-api-zdpd.onrender.com/recipes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })

    if(response.ok){
        loadRecipes()
    } else {
        alert('Failed to delete recipe')
    }
}
// SHOW DASHBOARD
function showDashboard(name) {
    document.getElementById('authPage').style.display = 'none'
    document.getElementById('dashboard').style.display = 'block'
    document.getElementById('welcomeText').textContent = `Welcome, ${name} 👋`
    loadRecipes()
}
// Check if already logged in
const token = localStorage.getItem('token')
if(token) {
    fetch('https://recipe-app-api-zdpd.onrender.com/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(user => showDashboard(user.name))
    .catch(() => localStorage.removeItem('token'))
}