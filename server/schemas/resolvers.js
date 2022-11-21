const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username, _id }) => {
      return User.findOne({ $or: [{ username }, { _id }] }).populate(
        'savedBooks'
      );
    },

    me: async (parent, args, context) => {
      console.log(context.user);
      console.log(context.authorization);
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, arg, context) => {
      console.log(arg);
      if (context.user) {
        // return User.findOne({ _id: context.user._id }).populate('savedBooks');

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: arg } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // return User.findOne({ _id: context.user._id }).populate('savedBooks');

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
