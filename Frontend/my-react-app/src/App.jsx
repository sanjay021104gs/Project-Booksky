import React, { useEffect, useState } from 'react'


const API = 'http://localhost:8080/api/books'


export default function App(){
const [books, setBooks] = useState([])
const [show, setShow] = useState(false)
const [form, setForm] = useState({ title: '', author: '', description: '' })


const [editingId, setEditingId] = useState(null)
const [editForm, setEditForm] = useState({ title: '', author: '', description: '' })


async function fetchBooks(){
try{
const res = await fetch(API)
if(!res.ok) throw new Error('Failed to fetch')
const data = await res.json()
setBooks(data)
}catch(e){
console.error(e)
}
}
useEffect(() => { fetchBooks() }, [])


async function addBook(e){
e.preventDefault()
if(!form.title.trim() || !form.author.trim()) return
const res = await fetch(API,{
method:'POST', headers:{'Content-Type':'application/json'},
body: JSON.stringify(form)
})
if(res.ok){
setForm({title:'',author:'',description:''})
setShow(false)
fetchBooks()
}
}


async function remove(id){
try{
await fetch(`${API}/${id}`,{ method:'DELETE' })
setBooks(books => books.filter(b => b.id !== id))
}catch(e){console.error(e)}
}


function startEdit(b){
setEditingId(b.id)
setEditForm({ title: b.title, author: b.author, description: b.description || '' })
}


async function saveEdit(id){
try{
const res = await fetch(`${API}/${id}`,{
method:'PUT', headers:{'Content-Type':'application/json'},
body: JSON.stringify(editForm)
})
if(res.ok){
setEditingId(null)
fetchBooks()
}
}catch(e){console.error(e)}
}


return (
<>
<div className="navbar"><h1>Booksky</h1></div>
<div className="container">
<div className="row">
{books.map(b => (
<div key={b.id} className="book-card">
{editingId === b.id ? (
<div>
<input value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})} placeholder="Book title" />
<input value={editForm.author} onChange={e=>setEditForm({...editForm,author:e.target.value})} placeholder="Book author" />
<textarea rows="4" value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} placeholder="Short description"/>
<div className="edit-row">
<button onClick={()=>saveEdit(b.id)}>Save</button>
<button onClick={()=>setEditingId(null)}>Cancel</button>
</div>
</div>
) : (
<div>
<h2>{b.title}</h2>
<h5>- By {b.author}</h5>
<p>{b.description}</p>
<div className="actions">
<button onClick={()=>startEdit(b)}>Edit</button>
<button onClick={()=>remove(b.id)}>Delete</button>
</div>
</div>
)}
</div>
))}
</div>
</div>



{/* Popup for Add */}
<div className="overlay" style={{display: show ? 'block':'none'}} onClick={()=>setShow(false)}></div>
<div className="popup" style={{display: show ? 'block':'none'}}>
<h2>Add book</h2>
<form onSubmit={addBook}>
<input placeholder="Book title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
<input placeholder="Book author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} />
<textarea rows="5" placeholder="Short description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}></textarea>
<button type="submit">ADD</button>
<button type="button" onClick={()=>setShow(false)}>CANCEL</button>
</form>
</div>


<button className="add-button" onClick={()=>setShow(true)}>+</button>
</>
)
}