import Router from 'koa-router';
import {readdir} from './Utils/PromisifyFS';

export default class RoutesCollector {

    private readonly routes:Router.IMiddleware;
    private static instance:RoutesCollector;

    private constructor() {}

    public static async getInstance(){
        if(typeof this.instance === "undefined"){
            this.instance = new RoutesCollector();
            try{
                await this.instance.init();
            }
            catch(error){
                console.error(error.name + '' + error.message);
            }
        }
        return this.instance;
    }

    private async init(){
        try{
            let routesFiles = await this.routesFilesFinder();
            console.log()
        }
        catch(error){
            console.error(error.name + '' + error.message);
        }

    }

    private async routesFilesFinder(currentPaths:Array<string> = [__dirname + "/../Modules/"]): Promise<Array<string>>{
        let folders:Array<string> = [];
        let routesFiles:Array<string> = [];
        let routesFolder:string;
        try{
            folders = await this.getInsidePaths(currentPaths);
            routesFolder = this.filterRoutesFolder(folders);
            if(routesFolder)
                routesFiles = await this.getFolderFiles(routesFolder);
        }
        catch(error){
            console.error(`${error.message}  \n ${error.stack}`);
        }
        return folders.length > 0 ?
            routesFiles.concat(await this.routesFilesFinder(folders)) :
            routesFiles;
    }

    private async getInsidePaths(currentPaths:Array<string>):Promise<Array<string>>{
        let insidePaths:Array<string> = [];
        for(let path of currentPaths){
            let pathFilesAndFolders = await readdir(path);
            let pathFolders = pathFilesAndFolders.filter((item:string) => {
                return /(?<!.)\w+(?!.)/.test(item);
            });
            let AbsolutePathToFolders = pathFolders.map((item) => {
                return path + item + '/';
            });
            insidePaths  = insidePaths.concat(AbsolutePathToFolders);
        }
        return insidePaths;
    }

    private filterRoutesFolder(folders:Array<string>):string{
        for(let folder of folders)
            if(/routes\/$/.test(folder))
                return folder;
            return '';
    }

    private async getFolderFiles(routesFolder:string):Promise<Array<string>>{
        try{
            let files = await readdir(routesFolder);
            return files.filter(file => /\.ts$/.test(file));
        }
        catch(error){
            console.error(`${error.message}  \n ${error.stack}`);
        }
        return [];
    }

}