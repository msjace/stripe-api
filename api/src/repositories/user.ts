import { ObjectId } from 'mongodb'

import { getDb } from './mongo/base'

import type { IUser } from '../common/interfaces/user'
import type { Collection } from 'mongodb'

async function getCollection(): Promise<Collection<IUser>> {
  const db = await getDb()
  return db.collection<IUser>('users')
}

export class UserRepository {
  public static async findById(id: string): Promise<IUser | null> {
    const collection = await getCollection()
    const user = await collection.findOne({ _id: new ObjectId(id) })
    return user ? { ...user, id: user._id.toString() } : null
  }

  public static async update(user: IUser): Promise<void> {
    const collection = await getCollection()
    await collection.findOneAndUpdate(
      { _id: new ObjectId(user.id) },
      { $set: user },
      { returnDocument: 'after' }
    )
  }
}
