import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchTags = createAsyncThunk('posts/tags', async () => {
	const { data } = await axios.get('/tags')
	return data
})

export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async id => axios.delete(`/posts/${id}`)
)

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	ruducer: {},
	extraReducers: {
		// Posts getting
		[fetchPosts.pending]: state => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: state => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		// Tags getting
		[fetchTags.pending]: state => {
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: state => {
			state.tags.items = []
			state.tags.status = 'error'
		},
		// Post removing
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				post => post._id !== action.payload
			)
		},
	},
})

export const postsReducer = postsSlice.reducer
