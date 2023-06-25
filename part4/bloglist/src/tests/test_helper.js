const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'Sarah',
    likes: 532,
    title: 'The Nightingale',
    url: 'SarahBooks.com',
    user: '6497ac2d041306ceda41576f',
  },
  {
    author: 'John',
    likes: 789,
    title: 'The Alchemist',
    url: 'JohnReads.com',
    user: '6497ac2d041306ceda41576f',
  },
  {
    author: 'Emily',
    likes: 245,
    title: 'Pride and Prejudice',
    url: 'EmilyWrites.com',
    user: '6497ac2d041306ceda41576f',
  },
  {
    author: 'Alex',
    likes: 623,
    title: 'The Great Gatsby',
    url: 'AlexReads.com',
    user: '6497ac2d041306ceda41576f',
  },
  {
    author: 'Sophia',
    likes: 421,
    title: 'To Kill a Mockingbird',
    url: 'SophiaBooks.com',
    user: '6497ac2d041306ceda41576f',
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

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  usersInDB,
}
