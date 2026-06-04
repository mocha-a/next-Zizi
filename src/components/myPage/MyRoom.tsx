import React from 'react'
import Image from 'next/image';
import { UserProfile } from '@/types/user/profile';

interface Props {
  user: UserProfile | undefined;
}

const MyRoom = ({ user }: Props) => {
  console.log(user);
  return (
    <div className='myRoom-container'>
      <div className='myRoom-profile'>
        <Image
          src={user?.image || '/default.png'}
          alt="Profile Image"
          width={50}
          height={50}
        />
        <div>
          <div>
            <p>이름</p>
            <p>{user?.name}</p>
          </div>
          <div>
            <p>이메일</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
      <div>
        <p>닉네임</p>
        <p>{user?.nickname}</p>
      </div>
      <div>
        <p>생년월일</p>
        <p>{user?.birth}</p>
      </div>
      <div>
        <p>성별</p>
        <p>{user?.gender}</p>
      </div>
    </div>
  )
}

export default MyRoom