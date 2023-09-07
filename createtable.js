import {sql} from './db.js'

// sql`

// drop table if exists videos;

// `.then(()=>{
//     console.log('table deletada')
// })

sql`
    create table videos(
        id text primary key,
        title text,
        description text,
        duration integer
    )
`.then(() => {
    console.log('Tabela criada')
})