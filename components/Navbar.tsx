'use client'

import Link from 'next/link';
import Image from 'next/image';
import {ClientSafeProvider, getProviders, LiteralUnion, signIn, signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {BuiltInProviderType} from "@node_modules/next-auth/providers";

const Navbar = () => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders()
            setProviders(providers)
        }

        fetchProviders()
    }, []);

    return (
        <nav className={'flex-between w-full mb-16 pt-3'}>
            <Link href={'/'} className={'flex flex-center gap-2'}>
                <Image
                    width={30}
                    height={30}
                    className={'object-contain'}
                    src={'/assets/images/logo.svg'}
                    alt={'logo'}
                />
                <p className="logo_text">Promtopia</p>
            </Link>
            {/* Desktop Navigation */}
            <div className={'sm:flex hidden'}>
                {session?.user ? (
                    <div className={'flex gap-3 md:gap-5'}>
                        <Link className={'black_btn'} href={'/create-prompt'}>
                            New Prompt
                        </Link>
                        <button className={'outline_btn'} onClick={() => signOut()}>Sign Out</button>
                        <Link href={'/profile'} className={''}>
                            <Image src={session.user.image as string} className={'rounded-full'} alt={'profile'}
                                   width={37} height={37}/>
                        </Link>
                    </div>
                ) : (<>
                    {providers && Object.values(providers).map(provider =>
                        <button
                            onClick={() => signIn(provider.id)}
                            key={provider.name}
                            type={'button'}
                            className={'black_btn'}>
                            Sign In
                        </button>)}
                </>)}
            </div>

            {/*  Mobile Navigation  */}
            <div className={'sm:hidden flex'}>
                {session?.user ? <div className="flex">
                    <Image
                        width={37}
                        height={37}
                        className={'object-contain cursor-pointer'}
                        src={'/assets/images/logo.svg'}
                        alt={'profile'}
                        onClick={() => setIsMenuOpen(prev => !prev)}
                    />
                    {isMenuOpen &&
                        <div className="dropdown">
                            <Link href={'/profile'} className={'dropdown_link'} onClick={() => setIsMenuOpen(false)}>
                                Profile
                            </Link>
                            <Link href={'/create-prompt'} className={'dropdown_link'}
                                  onClick={() => setIsMenuOpen(false)}>
                                New Prompt
                            </Link>
                            <button type={'button'} onClick={() => {
                                setIsMenuOpen(false)
                                signOut()
                            }} className={'black_btn w-full mt-4'}>
                                Sign Out
                            </button>
                        </div>
                    }
                </div> : <>
                    {providers && Object.values(providers).map(provider =>
                        <button
                            onClick={() => signIn(provider.id)}
                            key={provider.name}
                            type={'button'}
                            className={'black_btn'}>
                            Sign In
                        </button>)}
                </>}
            </div>
        </nav>
    );
};

export default Navbar;