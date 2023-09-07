import { randomUUID } from "node:crypto"

export class DatabaseMemory{

    #videos = new Map()

    list(search) {
       return Array.from(this.#videos.entries())
        .map(
            (videoRecieved) => {
                const id = videoRecieved[0]
                const data = videoRecieved[1]

                return{
                    id,
                    ...data
                }
            }
        )
        .filter(video =>  {
            if(search){
                return video.title.includes(search)
            }

            return true
        })
    }

    create(video) {
        const videoId = randomUUID()

        // UUID - Universal Unique Id

        this.#videos.set(videoId, video)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}