export type PhotoType = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export type AlbumType = {
    album: PhotoWithSubType[]
    page:number
}
export type PhotoWithSubType = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    subscription: boolean
}