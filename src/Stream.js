import React from 'react';
import {v4} from 'uuid';

const Stream=({data})=>{
    const {stream,_links}=data;
    const channel=_links.channel.split('/')[_links.channel.split('/').length-1];

    const channelName=channel.length>=12
    ?channel.substring(0,11)
    :channel

    const handleClick=()=>{
        window.open(`https://www.twitch.tv/${channel.toLowerCase()}`)
    }

    const about=stream?stream.channel.status.length>32
    ?stream.channel.status.substring(0,27)+'...'
    :stream.channel.status
    :null;
    
    
    const colorByStatus=stream?'online':'offline'
    
    const emptySpaceHandler=(param,limit)=>{
        if(limit>param.length){
            const emptySpace=Array.apply(null, Array(limit-param.length));
            return emptySpace.map(n=><span key={v4()} className='boardLetters invi'>a</span>)
        }
        return null;
    }
    return(
        <tr className={colorByStatus} onClick={handleClick}>
           <td className='channel' >
               {channelName.split('').map(n=><span key={v4()} className='boardLetters'>{n}</span>)}
               {emptySpaceHandler(channelName,11)}
               </td>
           
           <td className='about'>{stream?about.split('').map(n=><span key={v4()} className='boardLetters'>{n}</span>)
           :null}
           {stream
           ?emptySpaceHandler(about,30)
           :emptySpaceHandler('',30)}
           </td>
           
           <td className='view'>
               {stream?
           stream.viewers.toString().split('').map(n=><span key={v4()} className='boardLetters'>{n}</span>)
           :null}
           {stream
           ?emptySpaceHandler(stream.viewers.toString(),8)
            :emptySpaceHandler('',8)}
           </td>
           
           <td className='status'>{stream
           ?'online'.split('').map(n=><span key={v4()} className='boardLetters'>{n}</span>)
           :'offline'.split('').map(n=><span key={v4()} className='boardLetters'>{n}</span>)}
            {stream
            ?emptySpaceHandler('online',8)
            :emptySpaceHandler('offline',8)}
           </td>
        </tr>
    )
};

export default Stream;