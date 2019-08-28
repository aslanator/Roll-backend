import {Mongoose, connect} from 'mongoose';

const config = require(`${process.cwd()}/config.json`);

 class DB {

    private static mongoose:Mongoose;
    private static instance: DB;
    private static dbUrl: string = <string> config.db.dev.url;

    private constructor(){}

    public static async connect():Promise<DB>{
        if(!DB.instance){
            DB.instance = new DB();
            try{
                DB.mongoose = await connect(this.dbUrl, {useNewUrlParser: true});
            }
            catch(error){
                console.error(error);
            }
            DB.instance.errorHandling();
        }
        return DB.instance;
    }

    private errorHandling(){
        DB.mongoose.connection.on('error', (event: Event) => {
            console.error.bind(console, 'connection error:', event);
        });
    }
}


export = DB;
