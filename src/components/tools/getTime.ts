
interface iObj {en:'string',ar:'string'}


let unit={day:{en:'day',ar:' يوم'},hour:{en:'h',ar:' ساعة'},min:{en:'Min',ar:' دقيقة'},sic:{en:'Sec',ar:' ثانية'}}
export const getTime= (date:string,lan:string):string=>{

    

    let difference=new Date().getTime()- new Date(date).getTime() 
    let last_seen=''
    if (Math.round(difference/(1000 * 3600 *24 )) > 0) {
        last_seen=Math.round(difference/(1000 * 3600 *24 )) + unit['day'][lan as keyof iObj] 
    }
    else if (Math.round(difference/(1000 * 3600  )) > 0) {
        last_seen=Math.round(difference/(1000 * 3600  )) + unit['hour'][lan as keyof iObj]
       
    }
    else if (Math.round(difference/(1000 * 60  )) > 0) {
        last_seen=Math.round(difference/(1000 * 60  ))+unit['min'][lan as keyof iObj]
    }
    else {
        last_seen=Math.round(difference/(1000))+unit['sic'][lan as keyof iObj]
    }
  
    if (difference )return  last_seen
    return ''
}