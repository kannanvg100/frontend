import { apiSlice } from './apiSlice'
const USERS_URL = '/api'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: USERS_URL + '/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		signup: builder.mutation({
			query: (credentials) => ({
				url: USERS_URL + '/signup',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		update: builder.mutation({
			query: (credentials) => ({
				url: USERS_URL + '/profile',
				method: 'PATCH',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		logout: builder.mutation({
			query: () => ({
				url: USERS_URL + '/logout',
				method: 'GET',
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const { useLoginMutation, useLogoutMutation, useSignupMutation, useUpdateMutation } = usersApiSlice
