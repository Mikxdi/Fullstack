import React, {useState} from 'react'

const BlogForm = ({ blogs, setBlogs, blogService}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      author,
      title,
      url
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title:
          <input type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} id ='title' />
        </div>
        <div>
          author:
          <input type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} id='author'/>
        </div>
        <div>
          url:
          <input type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} id='url'/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm