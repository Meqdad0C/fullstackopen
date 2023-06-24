const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = null
  for (const blog of helper.initialBlogs) {
    blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)
  expect(title).toContain('To Kill a Mockingbird')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'pepbaw',
    likes: 1597,
    title: 'Seven Husbands of Evelyn Hugo',
    url: 'pepaw.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((r) => r.title)
  expect(contents).toContain('Seven Husbands of Evelyn Hugo')
})

test('blog without author is not added', async () => {
  const newBlog = {
    likes: 1597,
    title: 'Seven Husbands of Evelyn Hugo',
    url: 'pepbaw.com',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific note can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDB()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a note can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map((b) => b.author)
  expect(contents).not.toContain(blogToDelete.author)
})

afterAll(async () => {
  await mongoose.connection.close()
})
