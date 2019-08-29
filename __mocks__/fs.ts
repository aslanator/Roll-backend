import {URL} from "url";

type Fs = {readdir:Function};

const fs:Fs= jest.genMockFromModule('fs');

type PathLike = string | Buffer | URL;

function readdir(path:PathLike,
                 options: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding | undefined | null,
                 ){
    return '124';
}

fs.readdir = jest.fn().mockReturnValue('123');;

export = fs;