import { useState, useRef, useContext, useMemo, useEffect } from 'react';
import Header from "../components/components/Header";
import ChatInput from "../components/components/chatInput";
import OnboardingNote from "../components/components/OnboardingNote";
import {SettingContext} from '../components/contexts/SettingContext';
import {UploadFileContext} from '../components/contexts/UploadFileContext'
import { IS_RUNNING_ON_CLOUD } from "../components/config";
import { useRouter } from 'next/router';
import classNames from 'classnames';
import templates from '../templates/templates';

import dynamic from "next/dynamic";
import { GeneratedCodeConfig } from '@/components/types';
const Whiteboard = dynamic(
    async () => (await import("../components//components/Whiteboard")),
    {
      ssr: false,
    },
  )
  
// Whiteboard

const baseStyle = {
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  
  const focusedStyle = {};
  
  const acceptStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: "dashed",
    borderColor: "#00e676",
  };
  
  const rejectStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: "dashed",
    borderColor: "#ff1744",
  };
  

export default function Dashboard() {
    const { settings, setSettings, setInitCreate } = useContext(SettingContext);
    const { getRootProps, 
        isDragAccept,
        isFocused,
        isDragReject, 
        setUploadComplete,
        setDataUrls,
        open,
    } = useContext(UploadFileContext);
    const [openWhiteboard, setOpenWhiteboard] = useState(false);
    const [showAnim, setShowAnim] = useState<boolean>(false);
    const ref = useRef(null);
    const router = useRouter();
    useEffect(() => {
        setUploadComplete(() => {
            setInitCreate(true);
            router.push('/editor/create');
        })
    }, []);

    const style = useMemo(
        () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/editor')
      }, [router])
    

    return (
        <div 
            {...getRootProps({ style: style as any })}
            className="dark:bg-black dark:text-white h-full"
        >
            <div className='fixed w-full bg-slate-50 z-20'>
                <Header />
            </div>
            <main className='pb-10'>
                <div className='fixed right-0 top-20 w-[115px] flex flex-col items-center  justify-center py-6 gap-12'>
                    <div
                        onClick={open}
                        className='cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block px-2'>
                        <span className='relative text-white'>🔥screenshot</span>
                    </div>
                    <div
                        onClick={() => {
                            setOpenWhiteboard(true);
                        }}
                        className='cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-500 relative inline-block px-4'>
                        <span className='relative text-white'>whiteboard</span>
                    </div>
                    <div 
                        onClick={() => {
                            setShowAnim(true);
                            setTimeout(() => {
                                setShowAnim(false);
                            }, 800)
                        }}
                        className='cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-cyan-500 relative inline-block px-9'
                        >
                        <span className='relative text-white'>ideas</span>
                    </div>
                </div>
                <div className="w-full bg-white dark:bg-gray-800 border-t dark:border-t-gray-600 flex-col flex items-center justify-between p-3">
                    <div className="relative mt-80 w-[520px] rounded-md shadow-sm">
                        <ChatInput
                            openWhiteboard={() => {
                                setOpenWhiteboard(true);
                            }}
                            showAnim={showAnim}
                        />
                    </div>
                    <p className='mt-8'>Support Drag & drop a screenshot</p>
                </div>                    
                { IS_RUNNING_ON_CLOUD &&
                    !(settings.openAiApiKey) && settings.init && (
                    <div className="fixed left-[20px] bottom-[20px] z-[49]">
                        <OnboardingNote />
                    </div>
                    )
                }
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <h1 className="text-2xl font-bold">Templates</h1>
                        {/* <nav className="hidden md:flex space-x-10">
                            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Prompts
                            </a>
                        </nav> */}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            templates.list.map(template => {
                                return (
                                    <div onClick={() => {
                                        setSettings({
                                            ...settings,
                                            generatedCodeConfig: GeneratedCodeConfig.HTML_TAILWIND,
                                          })
                                        router.push(`/editor/${template.id}`);
                                    }} key={template.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col hover:ring ring-black">
                                        <div className="flex-1">
                                            <div className='aspect-[1376/768]'>
                                                <img className="w-full" src={template.imageUrl} alt={template.title} />
                                            </div>
                                            <h3 className="mt-4 text-sm text-gray-700">{template.title}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{template.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-[50px] w-[100%] p-2">
                    <p className='text-slate-300 text-center'>© Copyright <a className='text-sky-400 hover:text-sky-600' href="https://www.ancodeai.com/">ancodeAI</a> All rights reserved.</p>
                </div>
            </main>
       
            <div 
                className={classNames(
                    "fixed w-full h-full top-0 left-0 z-50",
                    {
                     'hidden': !openWhiteboard,
                    }
                )}
            >
                <Whiteboard 
                    doCreate={(urls: string[]) => {
                        setOpenWhiteboard(false);
                        setDataUrls(urls);
                        setInitCreate(true);
                        router.push('/editor/create');
                    }}
                    closeWhiteboard={() => {
                        setOpenWhiteboard(false);
                    }}
                />
            </div>
        </div>
    );
}