import type { ReactNode } from "react";
import { downloads, type DownloadKey } from "@/config/downloads";
import { cn } from "@/lib/utils/cn";

interface FileDownloadLinkProps {
  file: DownloadKey;
  children: ReactNode;
  className?: string;
}

export function FileDownloadLink({ file, children, className }: FileDownloadLinkProps) {
  const asset = downloads[file];

  return (
    <a href={asset.href} download={asset.filename} className={cn(className)}>
      {children}
    </a>
  );
}
