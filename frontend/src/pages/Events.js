 import { useLoaderData, json } from "react-router-dom";

import EventsList from '../components/EventsList';

function EventsPage() {

     const data = useLoaderData();
     const events = data.events;
    // if (data.isError) {
    //   return <p>{data.message}</p>;
    // }

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader () {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) { 
      //comment out yaptığım kodların hepsi çalışıyor sadece biri diğerinin alternatifi ve daha interaktif.
      // return {isError: true, message: 'Etkinliğe ulaşılamadı.'} 

      // throw {message: 'Etkinliğe ulaşılamadı.'}; 
             
      // throw new Response(JSON.stringify({mesaage: 'Etkinliğe ulaşılamadı.'}),
      // {status: 500,}
      // );

      throw json(
        {mesaage: 'Etkinliğe ulaşılamadı.'}, 
      {
        status: 500,
      });
    } else {
      return response;       
    }
  }


