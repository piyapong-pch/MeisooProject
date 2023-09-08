export default function Clock(){
    const   now = new Date();
    const   date = now.getDate(),
            month = now.getMonth(),
            day = now.getDay(),
            year = now.getFullYear(),
            hour = now.getHours(),
            minute = now.getMinutes()
    
    const monthData = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthDisplay = monthData[month]
    const dayData = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    const dayDisplay = dayData[day]
    let hourDisplay, minuteDisplay
    if (hour < 10){
        hourDisplay = "0" + hour
    } else {
        hourDisplay = hour
    }
    if (minute < 10){
        minuteDisplay = "0" + minute
    } else {
        minuteDisplay = minute
    }

    return (
        <div>
            <h1 className="dmy">{date} {monthDisplay} {year}</h1>
            <h2 className="day">{dayDisplay}</h2>
            <h2 className="time">{hourDisplay}:{minuteDisplay}</h2>
        </div>
    )
}