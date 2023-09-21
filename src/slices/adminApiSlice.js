import { apiSlice } from './apiSlice'
const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loginAdmin: builder.mutation({
			query: (credentials) => ({
				url: ADMIN_URL + '/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		logoutAdmin: builder.mutation({
			query: () => ({
				url: ADMIN_URL + '/logout',
				method: 'GET',
			}),
			invalidatesTags: ['User'],
		}),
		getUsers: builder.mutation({
			query: (search) => ({
				url: ADMIN_URL + `/users?search=${search}`,
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
		updateUser: builder.mutation({
			query: (user) => ({
				url: ADMIN_URL + '/update-user',
				method: 'PUT',
				body: user,
			}),
			invalidatesTags: ['User'],
		}),
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: ADMIN_URL + '/delete-user',
				method: 'DELETE',
				body: userId,
			}),
			invalidatesTags: ['User'],
		}),
		createUser: builder.mutation({
			query: (user) => ({
				url: ADMIN_URL + '/add-user',
				method: 'POST',
				body: user,
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const {
	useLoginAdminMutation,
	useLogoutAdminMutation,
	useGetUsersMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useCreateUserMutation,
} = adminApiSlice
