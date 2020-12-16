import React,{useState,useEffect} from 'react';
import './App.css';
import Stream from './Stream';

const App=()=>{
  const [streams,setStreams]=useState(null);
  useEffect(()=>{
    const streams=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
     "noobs2ninjas"];
    const allStreams=streams.map(s=>fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${s}`));
    Promise.all(allStreams)
    .then((result)=>{
      return Promise.all(result.map(r=>r.json()))
      .then((result)=>{
        return result;
      });
    })
    .then((streams)=>{
      setStreams(streams);
    })
  },[]);
  
  return(
    <div>
      <h1>Twitch Streamers <i className="fab fa-twitch"></i></h1>
      <table>
      <thead>
        <tr>
          <th className='channel' id="channel-head">Channel</th>
          <th className='about' id='about-head'>About</th>
          <th className='view' id='view-head'>Viewers</th>
          <th className='status' id='status-head'>Status</th>
        </tr>
        </thead>
        <tbody>
          {streams
          ?streams.map(s=><Stream key={s._links.channel} data={s}/>)
          :null}
        </tbody>
      </table>
      {!streams && <h3 id='loading'>Fetching Channel's data...</h3>}
    </div>
  )
};

export default App;