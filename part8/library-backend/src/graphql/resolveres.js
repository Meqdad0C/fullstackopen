const Book = require('../models/Book')
const Author = require('../models/Author')
const _ = require('lodash')
const { GraphQLError } = require('graphql/error')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (_.isEmpty(args)) {
        const books = await Book.find({}).populate('author')
        console.log(books)
        return books
      }
      let filteredBooks = await Book.find({}).populate('author')
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        )
      }
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author.name === args.author
        )
      }
      return filteredBooks
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const authorsWithBookCount = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.booksWritten.length,
        }
      })
      return authorsWithBookCount
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving Author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      try {
        author.booksWritten = author.booksWritten.concat(book._id)
        const returenedAuthor = await Author.findOneAndUpdate(
          { name: args.author },
          { booksWritten: author.booksWritten },
          { new: true }
        )
        console.log(returenedAuthor)
      } catch (error) {
        console.log(error)
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: parseInt(args.setBornTo) },
        { new: true }
      )
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Saving User failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
