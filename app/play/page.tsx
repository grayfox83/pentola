'use client';
import {Play} from "../ui/play";
import {useSearchParams} from "next/navigation";
import {useState} from "react";

export default function Page() {
    const searchParams = useSearchParams()
    const play = searchParams.get('name')
    const regex = new RegExp('^[a-z]+$');
    if (typeof play !== "string" || !regex.test(play)) {
        return  <div>
            Incorrect input
        </div>
    }
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    fetch('/plays/' + play + '.json').then(r => r.json()).then(data => {
        setData(data)
        setLoading(false)
    })
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data present</p>

    return <Play play={data}/>
}