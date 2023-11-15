import { useFetcher } from 'react-router-dom';

import classes from './NewsLetterSignup.module.css';
import { useEffect } from 'react';
function NewsletterSignup() {
    const fetcher = useFetcher();
    const {data, state} = fetcher;

    useEffect(()=>{
        if(state ==='idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data,state]);

    return (
      <fetcher.Form method="post" className={classes.newsletter}>
        <input
          type="email"
          placeholder="Uygulama için kayıt olun"
          aria-label="Daha fazlası için üye olun"
        />
        <button>Giriş Yap</button>
      </fetcher.Form>
    );
  }
  
  export default NewsletterSignup;