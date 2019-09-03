import RoutesCollector from "../../src/Main/RoutesCollector";
import promisifyFS from "../../__mocks__/promisifyFS";

test('getFolderFiles', async function(){
    let testRoutesCollector = new (RoutesCollector as any);
    let args = '';
    expect(await testRoutesCollector.getFolderFiles(args)).toStrictEqual([]);
    expect(promisifyFS.readdir).lastCalledWith(args);
    args = '/home/app/modules/';
    expect(await testRoutesCollector.getFolderFiles(args)).toStrictEqual([]);
    expect(promisifyFS.readdir).lastCalledWith(args);
    args = '/home/app/modules/auth/controllers/';
    expect(await testRoutesCollector.getFolderFiles(args)).toStrictEqual(
        ['/home/app/modules/auth/controllers/Index.ts', '/home/app/modules/auth/controllers/Something.ts']);
    expect(promisifyFS.readdir).lastCalledWith(args);
    args = '/home/app/modules/routes/';
    expect(await testRoutesCollector.getFolderFiles(args)).toStrictEqual(['/home/app/modules/routes/RootRoute.ts']);
    expect(promisifyFS.readdir).lastCalledWith(args);
    expect(promisifyFS.readdir.mock.calls.length).toBe(4);
});

test('filterRoutesFolder', function(){
    let testRoutesCollector = new (RoutesCollector as any);
    expect(testRoutesCollector.filterRoutesFolder([])).toStrictEqual('');
    expect(testRoutesCollector.filterRoutesFolder(['routes'])).toStrictEqual('routes');
    expect(testRoutesCollector.filterRoutesFolder(['test', 'Routes'])).toStrictEqual('Routes');
    expect(testRoutesCollector.filterRoutesFolder(['Route'])).toStrictEqual('');
});

test('getInsidePaths', async function(){
    let testRoutesCollector = new (RoutesCollector as any);
    let args:Array<string> = [];
    expect(await testRoutesCollector.getInsidePaths(args)).toStrictEqual([]);
    expect(promisifyFS.readdir).not.toBeCalled();
    args = ['/home/'];
    expect(await testRoutesCollector.getInsidePaths(args)).toStrictEqual(['/home/app/']);
    expect(promisifyFS.readdir).lastCalledWith(args[0]);
    args = ['/home/app/modules/auth/'];
    expect(await testRoutesCollector.getInsidePaths(['/home/app/modules/auth/'])).toStrictEqual([
        '/home/app/modules/auth/controllers/',
        '/home/app/modules/auth/models/',
        '/home/app/modules/auth/routes/'
    ]);
    expect(promisifyFS.readdir).lastCalledWith(args[0]);
    args = ['/home/app/modules/auth/', '/home/app/modules/some/'];
    expect(await testRoutesCollector.getInsidePaths(args)).toStrictEqual([
        '/home/app/modules/auth/controllers/',
        '/home/app/modules/auth/models/',
        '/home/app/modules/auth/routes/',
        '/home/app/modules/some/controllers/',
        '/home/app/modules/some/models/',
    ]);
    expect(promisifyFS.readdir.mock.calls[2]).toEqual([args[0]]);
    expect(promisifyFS.readdir.mock.calls[3]).toEqual([args[1]]);
    expect(promisifyFS.readdir.mock.calls.length).toBe(4);
});

test('routesFilesFinder', async function(){
    let testRoutesCollector = new (RoutesCollector as any);
    let args:Array<string> = [];
    expect(await testRoutesCollector.routesFilesFinder(args)).toStrictEqual([]);
    expect(promisifyFS.readdir).not.toBeCalled();

    args = ['/home/'];
    expect(await testRoutesCollector.routesFilesFinder(args)).toStrictEqual([
        '/home/app/modules/routes/RootRoute.ts',
        '/home/app/modules/auth/routes/AuthRoute.ts',
        '/home/app/modules/auth/routes/UserRoutes.ts',
    ]);
    expect(promisifyFS.readdir.mock.calls.length).toBe(13);

    args = ['/home/app/modules/auth/'];
    expect(await testRoutesCollector.routesFilesFinder(args)).toStrictEqual([
        '/home/app/modules/auth/routes/AuthRoute.ts',
        '/home/app/modules/auth/routes/UserRoutes.ts',
    ]);
    expect(promisifyFS.readdir.mock.calls.length).toBe(18);
});