import { Link } from "@workspace/ui/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref?: string;
  onLinkClick?: () => void;
  compact?: boolean;
}

export function AuthFooter({
  text,
  linkText,
  linkHref,
  onLinkClick,
  compact = false,
}: AuthFooterProps) {
  return (
    <div className="text-center w-full">
      <p
        className={
          compact ? "text-tiny text-default-500" : "text-small text-default-500"
        }
      >
        <span className="mr-2">{text}</span>
        {onLinkClick ? (
          <button
            className="text-primary hover:text-primary-600 text-small underline"
            type="button"
            onClick={onLinkClick}
          >
            {linkText}
          </button>
        ) : (
          <Link href={linkHref!} size={compact ? "sm" : "sm"}>
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
}
