export default function DefaultAvatar({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <rect width="40" height="40" fill="#27272a" />
            <circle cx="20" cy="15" r="7" fill="#52525b" />
            <path d="M4 42c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#52525b" />
        </svg>
    );
}
