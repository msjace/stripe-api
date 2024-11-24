interface ApiResponse<T> {
  success: boolean
  data: T | null
  errorMessage?: string
}

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
})

export const errorResponse = (errorMessage: string): ApiResponse<null> => ({
  success: false,
  data: null,
  errorMessage,
})
