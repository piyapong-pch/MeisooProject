
export default function DisplayTrack({currentTrack}){
    return (
        <>
            <audio src={currentTrack.src} controls />
        </>
    )
}