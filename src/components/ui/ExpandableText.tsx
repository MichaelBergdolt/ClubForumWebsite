import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ExpandableText = ({ text, maxLength = 200, className = "" }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate && !isExpanded 
    ? text.slice(0, maxLength) + "..." 
    : text;

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className="space-y-3">
      <p className={className}>{displayText}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-primary/80 transition-colors duration-300 text-sm font-medium group"
      >
        {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        )}
      </button>
    </div>
  );
};

export default ExpandableText;