import {Library} from "./lib/library";


export default function Page() {
    const library = Library();
    return <div className={'flex flex-col items-center h-max'}>
        <h1 className={'text-2xl mb-8'}>Пьесы:</h1>
        {library.plays?.map( (play) =>
        <a className={'font-medium text-blue-600 dark:text-blue-500'} href={'play?name='+play.filename} key={play.id}>{play.name}</a>
        )}
    </div>
}