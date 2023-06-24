const Blog = require('../models/blog')

const initialBlogs = [
  {
    author: 'Sarah',
    likes: 532,
    title: 'The Nightingale',
    url: 'SarahBooks.com',
  },
  {
    author: 'John',
    likes: 789,
    title: 'The Alchemist',
    url: 'JohnReads.com',
  },
  {
    author: 'Emily',
    likes: 245,
    title: 'Pride and Prejudice',
    url: 'EmilyWrites.com',
  },
  {
    author: 'Alex',
    likes: 623,
    title: 'The Great Gatsby',
    url: 'AlexReads.com',
  },
  {
    author: 'Sophia',
    likes: 421,
    title: 'To Kill a Mockingbird',
    url: 'SophiaBooks.com',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    author: 'willremovethissoon',
    title: 'willremovethissoon',
    url: 'willremovethissoon',
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
}
