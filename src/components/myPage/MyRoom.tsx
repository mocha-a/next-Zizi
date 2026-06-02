import { UserProfile } from '@/types/user/profile';
import React from 'react'

interface Props {
  user: UserProfile | undefined;
}

const MyRoom = ({ user }: Props) => {
  console.log(user);
  return (
    <div className='myRoom-container'>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  )
}

export default MyRoom