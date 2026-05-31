'use client';
import React from 'react';
import { Show } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';
import Logo from '../marketing/Logo';
import Auth from '../common/Auth';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#hero">Features</Link>
          <Link href="#how-works">How It Works</Link>
          <Link href="#live-example">Leave Demo</Link>
          <Link href="#pricing">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="rounded-xl cursor-pointer">
                Login
              </Button>
            </Link>

            <Link
              className="hidden xs:block"
              href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/`}
            >
              <Button size="lg" className="rounded-xl cursor-pointer">
                Start Free
              </Button>
            </Link>
          </Show>

          <Show when="signed-in">
            <Auth />
          </Show>
        </div>

      </div>
    </header>
  );
};

export default Header;