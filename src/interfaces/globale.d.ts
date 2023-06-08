import { OpenMode, PathLike, ObjectEncodingOptions, Mode } from "fs";
import { FileHandle } from "node:fs/promises";
import { Stream } from "node:stream";
import { Abortable } from "node:events";

export interface FileSystem {
  readFile(
    path: PathLike | FileHandle,
    options?:
      | ({
          encoding?: null | undefined;
          flag?: OpenMode | undefined;
        } & Abortable)
      | null
  ): Promise<Buffer>;

  access(path: PathLike, mode?: number): Promise<void>;
  writeFile(
    file: PathLike | FileHandle,
    data:
      | string
      | NodeJS.ArrayBufferView
      | Iterable<string | NodeJS.ArrayBufferView>
      | AsyncIterable<string | NodeJS.ArrayBufferView>
      | Stream,
    options?:
      | (ObjectEncodingOptions & {
          mode?: Mode | undefined;
          flag?: OpenMode | undefined;
        } & Abortable)
      | BufferEncoding
      | null
  ): Promise<void>;
}

