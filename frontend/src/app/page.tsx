'use client';

import { useState } from 'react';
import { 
  FileJson, 
  FileCode, 
  FileType, 
  Image as ImageIcon, 
  Palette, 
  Lock,
  LucideIcon
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { SearchBar } from '@/components/ui/SearchBar';
import { ToolCard } from '@/components/ui/ToolCard';
import { CategorySection } from '@/components/ui/CategorySection';

interface Tool {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tags: string[];
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
}

const tools: Tool[] = [
  {
    key: 'json-format',
    title: 'JSON Formatter',
    description: 'Beautify and validate JSON data with syntax highlighting and error detection.',
    icon: FileJson,
    href: '/tools/json/format',
    tags: ['JSON', 'Format'],
    category: 'Formatters',
    isPopular: true
  },
  {
    key: 'base64',
    title: 'Base64 Encoder',
    description: 'Encode and decode data to and from Base64 format instantly.',
    icon: Lock,
    href: '/tools/encode/base64',
    tags: ['Encode', 'Base64'],
    category: 'Encoders',
  },
  {
    key: 'markdown',
    title: 'Markdown Preview',
    description: 'Real-time Markdown editor with live preview and HTML export.',
    icon: FileCode,
    href: '#',
    tags: ['Markdown', 'Editor'],
    category: 'Editors',
  },
  {
    key: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Convert PDF pages to high-quality JPG or PNG images.',
    icon: ImageIcon,
    href: '/tools/pdf/to-images',
    tags: ['PDF', 'Image'],
    category: 'Converters',
    isPopular: true
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState('');

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchText.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <MainLayout hideSider>
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
        <main>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-b from-black via-[#0a0a0a] to-[#0a0a0a] border-b border-cyan-500/10">
            <div className="absolute inset-0 grid-bg opacity-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                Every developer tool you need.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  All in one place.
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                A collection of free, privacy-focused utilities for developers.
                Format JSON, encode Base64, convert images, and more. No ads, no tracking.
              </p>
              
              <SearchBar value={searchText} onChange={setSearchText} />

              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Popular:</span>
                <div className="flex gap-2">
                  {['JSON Formatter', 'PDF to JPG', 'UUID Generator'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => setSearchText(tag)}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 rounded-full transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

            <CategorySection 
              title="Text & Code" 
              description="Format, validate, and manipulate text and code snippets."
            >
              {filteredTools.map((tool) => {
                const { key, ...toolProps } = tool;
                return (
                  <ToolCard 
                    key={key}
                    {...toolProps}
                  />
                );
              })}
            </CategorySection>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium">No tools found matching your search</p>
                <button 
                  onClick={() => setSearchText('')}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
