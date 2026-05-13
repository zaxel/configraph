'use client';
import React from 'react';
import { Show, UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='h-20 bg-gray-200'>
      <nav className='w-full flex justify-end gap-6'>
        <Show when="signed-out">
          <Link href="/sign-in">Sign In</Link>
          <Link
            href="/sign-up"
            className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer flex items-center"
          >
            Sign Up
          </Link>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  );
};

export default Header;