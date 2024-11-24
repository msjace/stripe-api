import dotenv from 'dotenv'

dotenv.config()

export const getStripeApiKey = (): string => {
  return process.env.STRIPE_API_KEY as string
}
export const getServerPort = (): string => {
  return process.env.PORT as string
}

export const getMongoUri = (): string => {
  return process.env.MONGO_URI as string
}

export const getDatabaseName = (): string => {
  return process.env.DATABASE_NAME as string
}
