'use client';
import {Play} from "../ui/play";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    let play = searchParams.get('name')
    const regex = new RegExp('^[a-z]+$');
    if (typeof play !== "string" || !regex.test(play)) {
       play = "error";
    }
    useEffect(() => {
        fetch('/plays/' + play + '.json').then(r => r.json()).then(data => {
                setData(data)
                setLoading(false)
            }
        ).catch(() => {
            setData(null)
            setLoading(false)
        })
    }, []);
    if (isLoading) return <p>Загрузка...</p>
    if (!data) return <p>Нет данных</p>

    return <div>
        <a className={'font-medium text-blue-600 dark:text-blue-500'} href={'/'}>back</a>
        <Play play={data}/>
    </div>;
}