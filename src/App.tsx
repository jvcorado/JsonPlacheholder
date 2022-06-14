import React, { ChangeEvent, useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import './App.css';
import { Post } from './types/Post'

function App() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoanding] = useState(false);

  const[addTitleText, setAddTitleText] = useState('');
  const[addBodyText, setAddBodyText] = useState('');


  useEffect(()=>{
    loadPost()
  }, []);

  const loadPost = async () =>{
    setLoanding(true)
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let json = await response.json();
    setLoanding(false)
    setPosts(json);
  }

  const handleAddTitleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setAddTitleText(e.target.value);
  }

  const handleAddBodyChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    setAddBodyText(e.target.value);
  }

  const handleAddPost = async () =>{
    if(addTitleText && addBodyText){
      let response = await fetch("https://jsonplaceholder.typicode.com/posts",{
        method: 'POST',
        body: JSON.stringify({
          title:addTitleText,
          body:addBodyText,
          userId:1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let json = await response.json();

      if(json.id){
        alert('Post adicionado com sucesso!')
        
      }else{
        alert('Ocorreu algum erro')
      }

    }else {
      alert('Preencha os Campos solicitados');
    }
  }

  return (
    <div className="p-5">
      {loading &&
      <div>Carregando....</div>
      }

      <fieldset className='border-2 mb-3 p-3 '>
        <legend 
          className='font-black'>
          Adicionar Novo Post
        </legend>
        <input 
          value={addTitleText} 
          className='block border w-full mb-2 p-2' type="text" placeholder='Digite um Título'
          onChange={handleAddTitleChange}/>
        <textarea
          className='block border w-full mb-2 p-2' placeholder='Digite o Conteúdo da Postagem'
          onChange={handleAddBodyChange}
          value={addBodyText}>
        </textarea>
        <button 
          className='block border w-full p-2 bg-green-500 rounded-3xl text-white' onClick={handleAddPost}>Adicionar
        </button>
      </fieldset>
      {!loading && posts.length > 0 &&
        <>
          <div className=''>
            {posts.map((item, index) =>(
              <div key={index} className='p-4 mb-4 bg-slate-300 rounded-2xl shadow-xl text-base'>
                <h3 className='font-bold uppercase'>{item.title}</h3>
                <small>#{item.id} - Usuário: {item.userId}</small>
                <p className='leading-6'>{item.body}</p>
              </div>
            ))}
          </div>
        </>
      }
      {!loading && posts.length === 0 &&
        <div>Tente novamente mais tarde</div>
      }
    </div>
  );
}

export default App;
