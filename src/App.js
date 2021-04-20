import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'


import { FaSearch } from 'react-icons/fa'
import { Jumbotron } from 'react-bootstrap'
function App() {

  const [filtro, setFiltro] = useState('')
  const [foto, setFoto] = useState('')
  const [erroFiltro, setErroFiltro] = useState('')

  


  async function obterFoto() {

    const apiFoto = process.env.REACT_APP_APIFOTO // Utilizar a API no .env
    let urlFoto = `https://api.pexels.com/v1/search?query=${filtro}&per_page=100` // url base da API

    await fetch(urlFoto, {    
      headers: {
        Authorization: apiFoto
      }
    })  // receber a autorização na API

      .then(response => response.json())    // garantir que a resposta da API virá em json
      .then(data => {
        console.log(data)
        setFoto(data.photos[Math.floor(Math.random() * (data.photos.length + 1))].src.original) // pegar dados da foto 
     
  
      })
      .catch(function (error) {
        console.error(`Erro ao obter imagem: ${error.message}`)
        setErroFiltro(`Erro ao obter imagem: Digite uma palavra chave!`)
        
        
      })  
      





  }

  return (
    <>
      <div className="pagina">


        <div className="cabecalho">
          <br></br>
          <h1>Banco de imagens</h1>
          <p>Busque por imagens de forma gratuita!</p> <br>
          </br>

          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center"></div>   
            <div className="barra">
              <Form >
                <FormControl type="text" value={filtro} size="lg" onChange={event => setFiltro(event.target.value)}
                  placeholder="Qual imagem você procura?..."></FormControl>
              </Form>
              <br></br> 
              <div className="botao">  {/*Botao responsável pela procura da imagem */}
                <button onClick={() => obterFoto(filtro)}>PESQUISAR <FaSearch /></button>  
                <br></br> <br></br>
              { foto && 
              <Jumbotron>
                  <img src={foto} width="1000px"></img> {/* Objeto imagem com a definição da fonte e o tamanho */}
                  
                  </Jumbotron>}
              {erroFiltro &&

              <Alert variant = "danger" onClose={() => setErroFiltro(null)} delay = "3000">

                      <Alert.Heading>Ops!</Alert.Heading>

                      <p>
                        {erroFiltro}
                      </p>
              </Alert>

              }



              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br> <br></br>
    </>
  )
}

export default App