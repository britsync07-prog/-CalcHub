import React from 'react';
import { Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  onNavigate?: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '', onNavigate }) => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-slate-500 py-3 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li className="flex items-center gap-1.5">
          <a
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href || index} className="flex items-center gap-1.5">
              <span className="text-slate-300" aria-hidden="true">/</span>
              {isLast ? (
                <span className="text-slate-800 font-medium truncate max-w-[260px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="hover:text-slate-900 transition-colors truncate max-w-[200px]"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
