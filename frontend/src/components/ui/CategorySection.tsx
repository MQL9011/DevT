import React from 'react';

interface CategorySectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function CategorySection({
  title,
  description,
  children
}: CategorySectionProps) {
  return (
    <section className="relative py-8">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            {title}
          </h2>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <button className="text-sm text-gray-400 hover:text-cyan-400 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </section>
  );
}
