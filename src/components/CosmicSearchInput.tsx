"use client";

type CosmicSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
  className?: string;
};

const GlobeIcon = () => (
  <svg
    strokeLinejoin="round"
    strokeLinecap="round"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    height={24}
    width={24}
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle r={10} cy={12} cx={12} />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

export function CosmicSearchInput({
  value,
  onChange,
  placeholder = "Search services...",
  "aria-label": ariaLabel = "Search",
  className = "",
}: CosmicSearchInputProps) {
  return (
    <div className={`cosmic-search ${className}`.trim()}>
      <div className="cosmic-search__layers cosmic-search__nebula" aria-hidden />
      <div className="cosmic-search__layers cosmic-search__starfield" aria-hidden />
      <div className="cosmic-search__layers cosmic-search__stardust" aria-hidden />
      <div className="cosmic-search__layers cosmic-search__ring" aria-hidden />

      <div className="cosmic-search__main">
        <input
          type="search"
          className="cosmic-search__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="off"
        />
        <div className="cosmic-search__input-mask" aria-hidden />
        <div className="cosmic-search__glow" aria-hidden />

        <div className="cosmic-search__wormhole-border" aria-hidden />
        {value ? (
          <button
            type="button"
            className="cosmic-search__wormhole-icon"
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            <GlobeIcon />
          </button>
        ) : (
          <div className="cosmic-search__wormhole-icon" aria-hidden>
            <GlobeIcon />
          </div>
        )}

        <div className="cosmic-search__search-icon" aria-hidden>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            height={24}
            width={24}
            viewBox="0 0 24 24"
          >
            <circle r={8} cy={11} cx={11} />
            <line y2="16.65" x2="16.65" y1={21} x1={21} />
          </svg>
        </div>
      </div>
    </div>
  );
}
