import React from 'react';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export function ToolCard({
  title,
  description,
  icon: Icon,
  href,
  category,
  isPopular,
  isNew
}: ToolCardProps) {
  return (
    <Link href={href} className="block h-full">
      <div className="group relative flex flex-col p-5 bg-[#121212]/50 backdrop-blur-sm border border-solid border-white/5 rounded-xl hover:border-cyan-500/40 hover:bg-white/5 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors border border-solid border-cyan-500/10 group-hover:border-cyan-500/30">
            <Icon className="w-5 h-5 text-cyan-400" strokeWidth={2} />
          </div>
          {(isPopular || isNew) && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${isPopular ? 'bg-amber-500/20 text-amber-500 border border-solid border-amber-500/20' : 'bg-emerald-500/20 text-emerald-500 border border-solid border-emerald-500/20'}`}>
              {isPopular ? 'Popular' : 'New'}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
            {title}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {category && (
          <div className="mt-auto pt-3 border-t border-solid border-white/5 flex items-center">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{category}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
