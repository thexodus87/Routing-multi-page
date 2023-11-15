import { useNavigate, Form, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
   const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting'

  function cancelHandler() {
    navigate('..');
  }
//data && data.errors: Bu ifade, data değişkeninin var olup olmadığını kontrol eder. 
//Object.values(data.errors): Bu ifade, data.errors içindeki hataları temsil eder.

  return (
    <Form method={method} className={classes.form}>
         {data && data.errors && <ul> 
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>} 
      <p>
        <label htmlFor="title">Başlık</label>
        <input id="title"
         type="text"
          name="title" 
          required 
          defaultValue={event ? event.title : ''}
           />
      </p>
      <p>
        <label htmlFor="image">Resim</label>
        <input id="image"
         type="url" 
         name="image" 
         required 
         defaultValue={event ? event.image : ''}
          />
      </p>
      <p>
        <label htmlFor="date">Tarih</label>
        <input id="date"
         type="date"
          name="date"
           required
            defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Açıklama</label>
        <textarea id="description"
         name="description" 
         rows="5" 
         required 
         defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" 
        onClick={cancelHandler} 
        disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Onaylanıyor' : 'Kaydet'}
          </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action ({request, params}) {
  const method = request.method;
  console.log(request);
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
//Form submit edildiğinde, action fonksiyonu çağrılır. Bu fonksiyon, form verilerini alır ve bu verilerle bir POST isteği yapar.
 // fetch isteği
let url = 'http://localhost:8080/events/'
if (method === 'PATCH') {
const eventId = params.eventId;
url = 'http://localhost:8080/events/' + eventId;
}

const response = await fetch(url, {
  method: method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(eventData),
});

if (response.status === 422) {
  return response;
}

if (!response.ok){
throw({message: 'Etkinlik Kaydedilmedi'}, {status: 500})
} return redirect('/events'); 

//Eğer POST isteği başarılı olursa, kullanıcıyı /events sayfasına yönlendirir.
}
