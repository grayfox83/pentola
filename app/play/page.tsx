import {promises as fs} from "fs";
import {Play} from "../ui/play";

export default async function Page({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const play = searchParams.name;
    const regex = new RegExp('^[a-z]+$');
    if (typeof play !== "string" || !regex.test(play)) {
        return  <div>
            Incorrect input
        </div>
    }
    const file = await fs.readFile(process.cwd() + "/app/data/plays/" + play + ".json", 'utf8');
    const data = JSON.parse(file);
    return <Play play={data}/>
}