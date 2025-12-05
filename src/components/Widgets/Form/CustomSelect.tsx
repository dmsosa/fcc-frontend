import React, { useState, useRef, useEffect, type KeyboardEventHandler, type MouseEvent } from 'react';

export type Option<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type CustomSelectProps<T = string> = {
  options: Option<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  id?: string;
  className?: string;
};

// Default export: a single-file React + TypeScript component using TailwindCSS for styling.
// Usage example (in a parent file):
// <CustomSelect
//    options={[{value: 'en', label: 'English'}, {value: 'de', label: 'Deutsch'}]}
//    value={selected}
//    onChange={setSelected}
//    placeholder="Select language"
//    searchable
//    clearable
// />

export default function CustomSelect<T = string>(props: CustomSelectProps<T>) {
  const {
    options,
    value,
    onChange,
    placeholder = 'Select...',
    disabled = false,
    searchable = false,
    clearable = false,
    id,
    className = ''
  } = props;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState<number>(-1);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find(o => o.value === value) || null;

  const filtered = React.useMemo(() => {
    if (!searchable || query.trim() === '') return options.filter(o => !o.disabled);
    const q = query.toLowerCase();
    return options.filter(o => !o.disabled && o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

  useEffect(() => {
    // when open, reset highlight
    if (open) setHighlighted(0);
    else setHighlighted(-1);
  }, [open]);

//   useEffect(() => {
//     function onOutside(e: MouseEvent<HTMLElement>) {
//       if (!containerRef.current) return;
//       if (!containerRef.current.contains(e.target as Node)) setOpen(false);
//     }
//     document.addEventListener('mousedown', onOutside);
//     return () => document.removeEventListener('mousedown', onOutside);
//   }, []);

  useEffect(() => {
    if (open && listRef.current && highlighted >= 0) {
      const el = listRef.current.children[highlighted] as HTMLElement | undefined;
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [highlighted, open]);

  function toggleOpen(e: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (!open) {
        const childInput = e.currentTarget.querySelector('input');
        if (childInput) {
        childInput.focus();

        }
    }
    setOpen(v => !v);
  }

  function selectOption(opt: Option<T>) {
    if (opt.disabled) return;
    onChange(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function clearSelection(e?: React.MouseEvent) {
    e?.stopPropagation();
    onChange(null);
  }

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement | HTMLInputElement > = (e) => {
    if (disabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setHighlighted(h => Math.min((h === -1 ? 0 : h + 1), filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && highlighted >= 0 && filtered[highlighted]) {
        selectOption(filtered[highlighted]);
      } else {
        setOpen(v => !v);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div ref={containerRef} className={`position-relative inline-block text-left ${className}`}>
      <div>
        <button
          id={id}
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={id ? `${id}-label` : undefined}
          onClick={toggleOpen}
          onKeyDown={onKeyDown}
          className={`w-64 inline-flex justify-between items-center border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${disabled ? 'bg-gray-100' : 'bg-white'}`}>
          <span className="truncate">
            {selectedOption ? selectedOption.label : <span className="text-gray-400">{placeholder}</span>}
          </span>

          <span className="ml-2 flex items-center gap-2">
            {clearable && selectedOption ? (
              <button
                onClick={clearSelection}
                aria-label="Clear selection"
                className="p-1 rounded hover:bg-gray-100"
                title="Clear"
              >
                ✕
              </button>
            ) : null}

            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-64 bg-white border rounded-md shadow-lg">
          {searchable && (
            <div className="p-2">
              <input
                id={`${id}-cs-search`}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search..."
                className="cs-search"
                aria-label="Search options"
              />
            </div>
          )}

          <ul
            role="listbox"
            aria-activedescendant={highlighted >= 0 ? `option-${highlighted}` : undefined}
            ref={listRef}
            tabIndex={-1}
            className="max-h-56 overflow-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-500">No results</li>
            ) : filtered.map((opt, idx) => {
              const isHighlighted = idx === highlighted;
              const isSelected = selectedOption?.value === opt.value;
              return (
                <li
                  id={`option-${idx}`}
                  key={String(opt.value) + idx}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlighted(idx)}
                  onClick={() => selectOption(opt)}
                  className={`px-3 py-2 cursor-pointer select-none text-sm ${opt.disabled ? 'opacity-40 cursor-not-allowed' : ''} ${isHighlighted ? 'bg-indigo-100' : ''} ${isSelected ? 'font-semibold' : ''}`}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
