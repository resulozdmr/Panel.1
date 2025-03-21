import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfilePhoto from './shared/ProfilePhoto';
import { getAllPosts } from '@/lib/serveractions';

const Sidebar = async ({ user }: { user: any }) => {
  let posts = [];

  try {
    posts = (await getAllPosts()) || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className='hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded-lg'>
      <div className='flex relative flex-col items-center'>
        {/* Banner */}
        <Link href='/'>
          <div className='w-full h-auto overflow-hidden cursor-pointer'>
            {user && (
              <Image
                src={'/banner.png'}
                alt='Banner'
                layout='responsive'
                width={200}
                height={100}
                className='rounded-t'
              />
            )}
          </div>
        </Link>

        {/* Profile Photo */}
        <div className='my-1 absolute top-10 left-[40%]'>
          <ProfilePhoto src={user ? user?.imageUrl! : '/banner.jpg'} />
        </div>

        {/* User Info */}
        <div className='border-b border-b-gray-300'>
          <div className='p-2 mt-5 text-center'>
            <h1 className='font-bold hover:underline cursor-pointer'>
              {user ? `${user?.firstName} ${user?.lastName}` : 'Patel Mern Stack'}
            </h1>
            <p className='text-xs'>@{user ? `${user?.username}` : 'username'}</p>
          </div>
        </div>
      </div>

      {/* Contact Us Card */}
      <div className='border-t border-gray-300 p-4 text-center'>
        <h3 className='font-bold text-xl text-gray-800 mb-4'>Contact Us</h3>
        <div className='space-y-4 text-sm text-gray-700'>
          <div>
            <strong>Location:</strong><br />
            Bahçelievler Mah. Aşkabat Cad,<br />
            Aşkabat Cd. No:61 Çankaya/Ankara
          </div>
          <div>
            <strong>Email:</strong><br />
            info@drgulf.net<br />
            cv@drgulf.net
          </div>
          <div>
            <strong>Phone:</strong><br />
            +90 850 532 95 25<br />
            +90 532 151 92 86
          </div>
          <div>
            <strong>WhatsApp:</strong><br />
            <a href='https://wa.me/905321519286' target='_blank' className='text-green-600 hover:underline'>
              +90 532 151 92 86
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
