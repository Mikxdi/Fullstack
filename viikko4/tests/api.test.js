const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./testhelper')

beforeEach(async() => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

test('GET returns correct amount of blogs', async() => {
    const result = await api
      .get('/api/blogs')
  
    expect(result.body.length).toBe(6)
})
  
test('id field is id, not _id', async() => {
  const resultBlog = await api.get('/api/blogs/')
  const id = resultBlog.body[0].id
  expect(id).toBeDefined()
})
describe('POST', () => {
    test('new blog with correct info', async() => {
      const newBlog = {
        author: "jan",
        likes: 19
        url: "www.lets.fi",
        title: "testi"
      }
  
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const blogsDB = await helper.blogsInDb()
    expect(blogsDB.length).toBe(helper.initialBlogs.length + 1)
})
  
test('blog likes default value is 0', async() => {
    const newBlog = {
        author: "jan",
        url: "www.lets.fi",
        title: "testi"
    }
  
      const savedBlog = await api.post('/api/blogs')
        .send(newBlog)
  
      expect(savedBlog.body.likes).toBe(0)
})
  
test('posting without url doesnt work', async() => {
  const newBlog = {
    author: "jan",
    title: "testi"
  }
  
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
  
test('posting without title doesnt work', async() => {
      const newBlog = {
        author: "jan",
        url: "www.lets.fi",
      }
  
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
})
  
  
  afterAll(() => {
    mongoose.connection.close()
  })