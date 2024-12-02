export function ReadableDate (date:string,timeInclude:boolean){
    let newDate = new Date(date)
    if(timeInclude){
        return newDate.toLocaleDateString('en-US',{
            weekday:'short',
            year:'numeric',
            month:'short',
            day:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
            hour12:true,
            hourCycle:'h12'
        })
    }else{
        return newDate.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "2-digit"
        });
    }
}