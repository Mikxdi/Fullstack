import React, {useState} from 'react'

const Blog = ({ blog, blogService, blogs, setBlogs, user, handleLikeClick}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }


  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title}`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const title = (
    <div>
      <button onClick={toggleShowAll} id = 'more'>näytä lisätietoja</button>
      <div>Blogin nimi: {blog.title}</div>
      <div>Kirjoittaja: {blog.author}</div>
    </div>
  )

  const all = (
    <div>
      <button onClick={toggleShowAll}>Näytä vähemmän</button>
      <div>{blog.title} {blog.author}</div>
      <div>{blog.url}</div>
      <div>{`${blog.likes} likes`} <button onClick={handleLikeClick} id ='like'>tykkää</button></div>
      <div>{`${blog.user.username}`}</div>
      {user.name === blog.user.name && <button onClick={handleRemove}>remove</button>}
    </div>
  )
  return (
    <div style={blogStyle}>
      <div >
        {showAll ? all : title}
      </div>
    </div>
  )
}
export default Blog