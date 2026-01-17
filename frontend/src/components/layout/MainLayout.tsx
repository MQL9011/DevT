'use client';

import { Layout, Typography } from 'antd';
import { Wrench, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Content, Footer } = Layout;
const { Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
  hideSider?: boolean;
}

export default function MainLayout({ children, hideSider = false }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <Layout className="min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-1.5 rounded-lg shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                DevTools<span className="text-cyan-400">.io</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              All Tools
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              Categories
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link 
              href="#" 
              className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Submit Tool
            </Link>
          </nav>
        </div>
      </header>

      <Layout className="bg-transparent">
        <Content className="min-h-[calc(100vh-64px-70px)] bg-transparent">
          {children}
        </Content>

        <Footer className="bg-[#0a0a0a] border-t border-cyan-500/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-1 rounded-md shadow-lg shadow-cyan-500/30">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-lg text-white">DevTools.io</span>
                </div>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                  A collection of free developer tools made with love for the
                  community. Open source and privacy-friendly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">API Reference</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Changelog</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-cyan-500/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} DevTools.io. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}
