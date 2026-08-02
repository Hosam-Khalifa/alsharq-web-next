"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, ImageIcon, Trash2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { AttachmentMeta } from "@/lib/validation/quote-wizard-schema";
import { cn } from "@/lib/utils/cn";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
const ACCEPT_ATTR = ".pdf,.jpg,.jpeg,.png";

interface FileDropzoneProps {
  files: AttachmentMeta[];
  onChange: (files: AttachmentMeta[]) => void;
}

export function FileDropzone({ files, onChange }: FileDropzoneProps) {
  const t = useTranslations("quote");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const processFiles = useCallback(
    async (list: FileList | File[]) => {
      setError(null);
      const incoming = Array.from(list);
      const next = [...files];

      for (const file of incoming) {
        const type = file.type === "image/jpg" ? "image/jpeg" : file.type;
        if (!ACCEPTED.includes(type) && !/\.(pdf|jpe?g|png)$/i.test(file.name)) {
          setError(t("uploadInvalidType"));
          continue;
        }
        if (file.size > MAX_BYTES) {
          setError(t("uploadTooLarge"));
          continue;
        }

        const id = `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`;
        setProgress((prev) => ({ ...prev, [id]: 15 }));

        await new Promise<void>((resolve) => {
          let value = 15;
          const timer = window.setInterval(() => {
            value = Math.min(value + 28, 100);
            setProgress((prev) => ({ ...prev, [id]: value }));
            if (value >= 100) {
              window.clearInterval(timer);
              resolve();
            }
          }, 80);
        });

        next.push({
          id,
          name: file.name,
          size: file.size,
          type,
        });
      }

      onChange(next);
      window.setTimeout(() => setProgress({}), 400);
    },
    [files, onChange, t],
  );

  const removeFile = (id: string) => {
    onChange(files.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          if (event.dataTransfer.files?.length) {
            void processFiles(event.dataTransfer.files);
          }
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition",
          dragOver
            ? "border-primary bg-accent-soft"
            : "border-border bg-surface-muted/50 hover:border-primary/50",
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-primary">
          <Upload className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-sm font-medium text-foreground">{t("uploadDropTitle")}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t("uploadHint")}</p>
        <Button type="button" variant="outline" size="sm" className="mt-4 pointer-events-none">
          {t("uploadBrowse")}
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={(event) => {
            if (event.target.files?.length) {
              void processFiles(event.target.files);
              event.target.value = "";
            }
          }}
        />
      </div>

      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file) => {
            const isImage = file.type.startsWith("image/");
            const Icon = isImage ? ImageIcon : FileText;
            const pct = progress[file.id];

            return (
              <li
                key={file.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                  {typeof pct === "number" && pct < 100 ? (
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  ) : null}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFile(file.id)}
                  aria-label={t("uploadRemove")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
