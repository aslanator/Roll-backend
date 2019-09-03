import {URL} from "url";

type folderStructure = {[key: string]: folderStructure | null};
type PathLike = string | Buffer | URL;

const virtualStructure:folderStructure = {
    "home": {
        "app": {
            "modules": {
                "auth" : {
                    "controllers": {
                        "Index.ts" : null,
                        "Something.ts": null
                    },
                    "models": {
                        "Any.ts": null
                    },
                    "routes": {
                        "AuthRoute.ts": null,
                        "UserRoutes.ts": null
                    }
                },
                "some" : {
                    "controllers": {
                        "Index1.ts" : null,
                        "Something1.ts": null
                    },
                    "models": {
                        "Any1.ts": null
                    },
                },
                "routes": {
                    "RootRoute.ts": null
                }
            }
        }
    }
};

const promisifyFS = require.requireActual('../src/Main/Utils/PromisifyFS');

promisifyFS.readdir = jest.fn((path:PathLike,
                               options?: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding | undefined | null,): Promise<Array<string> | null> => {
    if(path instanceof Buffer || path instanceof  URL)
        path = path.toString();
    let arrayPath:Array<string> = path.split('/').filter(Boolean);
    let structure:folderStructure = virtualStructure;
    for(let pathPart of arrayPath){
        if(pathPart in structure){
            let newStructureLevel:folderStructure | null = structure[pathPart];
            if(newStructureLevel === null)
                return new Promise(resolve => resolve(Object.keys(structure)));
            structure = newStructureLevel;
        }
        else
            return new Promise((resolve, reject) => reject(null));
    }
    return new Promise(resolve => resolve(Object.keys(structure)));
});

export default promisifyFS;