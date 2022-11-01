export interface Data {
  data: []
}

export interface Post {
  title: string
  body: string
  id: number
  userId: number
}

export interface User {
  id: number
  name: string
}

export interface Comment {
  id: number
}

export interface Props {
  posts?: []
  users?: []
  comments?: []
  isLoading?: boolean
  isError?: boolean
  openModal?: boolean
  handleCloseModal?: boolean
  handleOpenCommentsModal?: any
  style?: {}
  postId?: number
  text?: string
}

export interface SinglePost {
  userId: number 
  title: string
  body: string
  id: number
}