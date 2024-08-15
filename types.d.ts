type BlogPost = {
    id: string,
    title: string,
    createdAt: string,
    slug: string,
    img: string,
    audio: string,
    desc: string,
    desc_jp: string,
    level: number,
    published: boolean,
    level: number,
    keyWords: Word[],
    
}

type Word = {
    id: string,
    English: string,
    Japanese: string,
    searchByEng: boolean,
}