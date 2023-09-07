// import {createServer} from 'node:http';

// const server = createServer((req, res) => {
//     res.write("Hello World")

//     return res.end()
// })

// server.listen(3333)


import { fastify } from 'fastify'
// import {DatabaseMemory} from './database.js'
import {dataPost} from './databasePost.js'

const server = fastify()

const db = new dataPost();

/*
    CRUD(Create, READ, Update, Delete)

    POST - Criação de registros
    GET - Buscar/obter informação

    PUT - Alteração dp registro
    DELETE - Deletar o registro

    Status Code

    200 -> Sucesso
    201 -> algo foi criado
    204 -> Resposta com sucesso e sem conteudo na resposta(resposta vazia)
*/
// http://localhost:4444/videos / Adicionar videos


// Request Body



 server.post('/videos', async (request, reply)=>{
    const {title, description, duration} = request.body

    await db.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

// http://localhost:4444/videos
// Acessar videos
server.get('/videos', async (request, reply)=>{

    const search = request.query.search
    const videos = await db.list(search)

    console.log(search)

    return videos
})


//Route parameter(Parametro enviado na rota)
//Alterar videos
server.put('/videos/:id', async (request, reply)=>{
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await db.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})


server.delete('/videos/:id', async (request, reply)=>{
    const videoId = request.params.id

    await db.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 4444
})