import DisplayTrack from "./displaytrack"
import Controls from "./controls"
import ProgressBar from "./progressbar"
import { tracks } from "./tracks.js"
import { useState } from "react"

export default function AudioPlayer(){
    const [currentTrack, setCurrentTrack] = useState(tracks[0]);
    return (
        <div className="audio-player">
            <div className="inner">
                <DisplayTrack currentTrack={currentTrack}/>
                <Controls/>
                <ProgressBar/>
            </div>
        </div>
    )
}