import apiClient from '../api/axiosConfig';

export const todoService = {
  getTodo: async (limit = 30, skip = 0) => {
    const response = await apiClient.get('/todos', {
      params: { limit, skip }
    });
    return response.data;
  },
  
  updateTodo: async (id, updateData) => {
    const response = await apiClient.put(`/todos/${id}`, updateData);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  },
};
