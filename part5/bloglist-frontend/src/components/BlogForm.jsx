import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const submitNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    handleSubmit(blogObject)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <>
      <h2>blog form</h2>
      <form onSubmit={submitNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            autoComplete={'off'}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            autoComplete={'off'}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            autoComplete={'off'}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm