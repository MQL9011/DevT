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
      <div className="group relative flex flex-col p-5 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 group-hover:border-cyan-500/40">
            <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
          </div>
          {(isPopular || isNew) && (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isPopular
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {isPopular ? 'Popular' : 'New'}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-mono text-sm font-semibold text-white mb-1.5 flex items-center gap-1">
            {title}
            <ArrowUpRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {category && (
          <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center">
            <span className="text-xs text-gray-500 font-medium">{category}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
