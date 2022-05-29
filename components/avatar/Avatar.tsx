import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  seed?: string
  large?: boolean
}

const Avatar = ({ seed, large }: AvatarProps) => {
  const { data: session } = useSession()

  return (
    <div
      className={`border-gary-300 relative h-10 w-10 overflow-hidden rounded-full border bg-white ${
        large && 'h-20 w-20'
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/big-ears-neutral/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
      />
    </div>
  )
}

export default React.memo(Avatar)
